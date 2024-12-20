<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Impostazioni email
$to = "info@oneblade.it";
$subject = "Invio dati per Recruitment";

// Chiave API che deve essere inviata con la richiesta
$api_key = "7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6";

// Controllo che i dati siano stati inviati tramite POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica della chiave API
    $received_api_key = isset($_POST['api_key']) ? $_POST['api_key'] : '';

    if ($received_api_key !== $api_key) {
        echo json_encode(["status" => "error", "message" => "Autenticazione fallita."]);
        exit();
    }

    // Ricevi i dati dal form
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $telephone = isset($_POST['telephone']) ? $_POST['telephone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $vat = isset($_POST['vat']) ? $_POST['vat'] : '';
    $applicationType = isset($_POST['applicationType']) ? $_POST['applicationType'] : '';
    $questionnaireReport = isset($_POST['questionnaireReport']) ? $_POST['questionnaireReport'] : 'Nessun report disponibile';

    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => "Il campo 'Email' è richiesto."]);
        exit();
    }

    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $file_tmp = $_FILES['file']['tmp_name'];
        $file_name = $_FILES['file']['name'];
        $file_size = $_FILES['file']['size'];
        $file_type = $_FILES['file']['type'];

        $handle = fopen($file_tmp, "r");
        $content = fread($handle, $file_size);
        fclose($handle);

        $encoded_content = chunk_split(base64_encode($content));
        $boundary = md5("random");

        // Headers dell'email
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n";

        // Corpo del messaggio con `questionnaireReport`
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode(
            "Nome: $name\n" .
            "Telefono: $telephone\n" .
            "Email: $email\n" .
            "Partita IVA: $vat\n" .
            "Tipo di candidatura: $applicationType\n\n" .
            "Questionnaire Report:\n$questionnaireReport\n"
        ));

        // Allegato
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
        $body .= $encoded_content;

        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(["status" => "success", "message" => "Email inviata con successo!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Errore nell'invio dell'email."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Errore nel caricamento del file."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Richiesta non valida."]);
}
?>