<?php
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class Database {
    private $host = "localhost"; // Cambia con il tuo hostname
    private $db_name = "nome_database";
    private $username = "utente_db";
    private $password = "password_db";
    private $conn;
    private $secret_key = "TUA_CHIAVE_SEGRETA"; // Chiave per firmare JWT

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("sqlsrv:Server=" . $this->host . ";Database=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "Errore di connessione: " . $exception->getMessage();
        }
        return $this->conn;
    }

    public function sendEmail($to, $subject, $body) {
        $headers = "From: support@oneblade.it\r\n";
        $headers .= "Reply-To: support@oneblade.it\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        return mail($to, $subject, $body, $headers);
    }

    public function authenticate($email, $password) {
        $conn = $this->getConnection();
        
        $password_hash = hash('sha256', $password); // Hash della password in SHA256
        
        $query = "SELECT id FROM utenti WHERE email = :email AND password = :password";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password_hash);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $token = [
                "iat" => time(),
                "exp" => time() + (60 * 60), // 1 ora di validità
                "data" => ["id" => $user['id'], "email" => $email]
            ];
            
            return JWT::encode($token, $this->secret_key, 'HS256');
        }
        return null;
    }
    
    public function registerUser($nome, $cognome, $email, $cellulare, $password) {
        $conn = $this->getConnection();
        
        $password_hash = hash('sha256', $password); // Hash della password in SHA256
        
        $query = "INSERT INTO utenti (nome, cognome, email, cellulare, password) VALUES (:nome, :cognome, :email, :cellulare, :password)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":cognome", $cognome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":cellulare", $cellulare);
        $stmt->bindParam(":password", $password_hash);
        
        return $stmt->execute();
    }
    
    public function resetPassword($email) {
        $conn = $this->getConnection();
        
        // Genera una nuova password casuale
        $new_password = bin2hex(random_bytes(4)); // 8 caratteri esadecimali
        $password_hash = hash('sha256', $new_password);
        
        $query = "UPDATE utenti SET password = :password WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":password", $password_hash);
        $stmt->bindParam(":email", $email);
        
        if ($stmt->execute()) {
            // Invia email con la nuova password utilizzando il metodo generico
            $subject = "Recupero Password - OneBlade";
            $body = "Ciao,\n\nAbbiamo ricevuto una richiesta di recupero password per il tuo account OneBlade.\n\nLa tua nuova password è: " . $new_password . "\n\nTi consigliamo di accedere e modificarla subito per garantire la sicurezza del tuo account.\n\nSe non hai richiesto il recupero password, ignora questa email.\n\nGrazie,\nIl Team OneBlade";
            
            return $this->sendEmail($email, $subject, $body);
        }
        return false;
    }
    
    public function getUserData($jwt) {
        try {
            $decoded = JWT::decode($jwt, new Key($this->secret_key, 'HS256'));
            $userId = $decoded->data->id;
            
            $conn = $this->getConnection();
            $query = "SELECT id, email, nome, cognome FROM utenti WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":id", $userId);
            $stmt->execute();
            
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return null;
        }
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"));
        $email = $data->email;
        $password = $data->password;
        $token = $this->authenticate($email, $password);
        if ($token) {
            echo json_encode(["token" => $token]);
        } else {
            echo json_encode(["message" => "Login failed"]);
        }
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"));
        $nome = $data->nome;
        $cognome = $data->cognome;
        $email = $data->email;
        $cellulare = $data->cellulare;
        $password = $data->password;
        if ($this->registerUser($nome, $cognome, $email, $cellulare, $password)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
    }
}
