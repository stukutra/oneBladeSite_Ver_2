<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *"); // Aggiungi questa riga per consentire esperimenti temporanei

// Impostazioni email
$to = "info@oneblade.it";
$subject = "Invio dati per richiesta di programmatori o figure professionali";

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
    $email = isset($_POST['email']) ? $_POST['email'] : '';  // L'email fornita dall'utente
    $vat = isset($_POST['vat']) ? $_POST['vat'] : '';
    $applicationType = isset($_POST['applicationType']) ? $_POST['applicationType'] : '';
    $selectedTalent = isset($_POST['selectedTalent']) ? json_decode($_POST['selectedTalent'], true) : null;

    // Verifica che il campo "email" sia presente e non sia vuoto
    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => "Il campo 'Email' è richiesto."]);
        exit();
    }

    // Corpo dell'email
    $message = "Nome: $name\nTelefono: $telephone\nEmail: $email\nPartita IVA: $vat\nTipo di candidatura: $applicationType\n";

    // Aggiungi i dettagli del talento selezionato se presenti
    if (is_array($selectedTalent)) {
        $message .= "Dettagli del Talento Selezionato:\n";
        $message .= "Ruolo: " . $selectedTalent['role'] . "\n";
        $message .= "Contratto Minimo: " . $selectedTalent['minContract'] . "\n";
        $message .= "Anzianità: " . $selectedTalent['seniority'] . "\n";
        $message .= "Tipologia di lavoro: " . $selectedTalent['workType'] . "\n"; // Aggiungi questa linea
        $message .= "Tariffa Giornaliera (" . $selectedTalent['selectedRate'] . "): " . $selectedTalent['dailyRate'][$selectedTalent['selectedRate']] . "\n"; // Correggi questa linea
        $message .= "Competenze: " . implode(", ", $selectedTalent['skills']) . "\n";
        $message .= "Frameworks/Libraries: " . implode(", ", array_column($selectedTalent['frameworks_libraries'], 'name')) . "\n"; // Correggi questa linea
        $message .= "Tools: " . implode(", ", array_column($selectedTalent['tools'], 'name')) . "\n"; // Correggi questa linea
        $message .= "Lingue Parlate: " . implode(", ", array_map(function($lang, $level) {
            return "$lang: $level";
        }, array_keys($selectedTalent['languages_spoken']), $selectedTalent['languages_spoken'])) . "\n";
    }

    // Headers dell'email
    $headers = "From: " . $email . "\r\n";  // Usa l'email dell'utente come mittente
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";

    // Invia email principale
    if (mail($to, $subject, $message, $headers)) {
        // Invia email di cortesia all'utente
        $courtesy_subject = "Grazie per averci contattato";
        $courtesy_message = "Gentile $name,\n\n";
        $courtesy_message .= "Grazie per averci contattato. Ti ricontatteremo a breve.\n\n";
        $courtesy_message .= "Distinti saluti,\n";
        $courtesy_message .= "oneBlade\n\n";
        $courtesy_message .= "Riepilogo dei dati inviati:\n";
        $courtesy_message .= $message;

        $courtesy_headers = "From: info@oneblade.it\r\n";
        $courtesy_headers .= "Reply-To: info@oneblade.it\r\n";
        $courtesy_headers .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";

        mail($email, $courtesy_subject, $courtesy_message, $courtesy_headers);

        echo json_encode(["status" => "success", "message" => "Email inviata con successo!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Errore nell'invio dell'email."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Richiesta non valida."]);
}

?>
