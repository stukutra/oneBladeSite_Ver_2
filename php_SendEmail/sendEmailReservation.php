<?php
header('Content-Type: application/json');
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// Impostazioni email
$to = "business@oneblade.it"; // Email destinatario principale
$api_key = "7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6";
$from="noreply@oneblade.it";
// Controllo che i dati siano stati inviati tramite POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica della chiave API
    $received_api_key = $_POST['api_key'] ?? '';
    
    if ($received_api_key !== $api_key) {
        echo json_encode(["status" => "error", "message" => "Autenticazione fallita."]);
        exit();
    }

    // Ricevi i dati dal form
    $name = $_POST['name'] ?? '';
    $telephone = $_POST['telephone'] ?? '';
    $email = $_POST['email'] ?? '';
    $course = $_POST['course'] ?? '';
    $privacy_mandatory = isset($_POST['privacy1']) ? "Accettato ✅" : "NON Accettato ❌";
    $privacy_optional = isset($_POST['privacy2']) ? "Accettato ✅" : "NON Accettato ❌";

    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => "Il campo 'Email' è richiesto."]);
        exit();
    }

    // Se il consenso obbligatorio non è accettato, blocca l'invio
    if ($privacy_mandatory === "NON Accettato ❌") {
        echo json_encode(["status" => "error", "message" => "Devi accettare il consenso obbligatorio per procedere."]);
        exit();
    }

    // Oggetto della mail
    $subject = "Prenotazione corso oneBladeLAB - $course";

    // Corpo del messaggio per l'azienda
    $body = "📌 **Nuova prenotazione per il corso \"$course\"**.\n\n";
    $body .= "🧑 Nome: $name\n";
    $body .= "📞 Telefono: $telephone\n";
    $body .= "📧 Email: $email\n\n";

    // Informazioni sulla privacy
    $body .= "🔐 **Consensi privacy:**\n";
    $body .= "- Consenso Obbligatorio: $privacy_mandatory\n";
    $body .= "- Consenso Facoltativo: $privacy_optional\n\n";

    // Firma dell'email
    $signature = "------------------------------------------\n";
    $signature .= "oneBlade S.r.l.\n";
    $signature .= "Via Di Valle Lupare 10, 00148\n";
    $signature .= "P.IVA/C.F. 16510411008\n";
    $signature .= "https://www.oneblade.it\n";
    $signature .= "info@oneblade.it\n\n";
    $signature .= "*Rispetta l'ambiente - È veramente necessario stampare questa e-mail?*\n";

    $body .= $signature;

    // Headers dell'email
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Invia l'email all'azienda
    $sent_to_company = mail($to, $subject, $body, $headers);

    // **Invio della conferma all'utente**
    $customer_subject = "Conferma prenotazione corso - $course";
    $customer_body = "Gentile $name,\n\n";
    $customer_body .= "Grazie per aver effettuato la prenotazione per il corso \"$course\" su OneBladeLAB.\n\n";
    $customer_body .= "A breve verrai contattato per ricevere tutti i dettagli relativi alla tua partecipazione.\n";
    $customer_body .= "Se hai domande, non esitare a contattarci.\n\n";
    $customer_body .= "🔐 **Consensi privacy forniti:**\n";
    $customer_body .= "- Consenso Obbligatorio: $privacy_mandatory\n";
    $customer_body .= "- Consenso Facoltativo: $privacy_optional\n\n";
    $customer_body .= $signature;

    // Invia l'email di conferma al cliente
    $sent_to_customer = mail($email, $customer_subject, $customer_body, $headers);

    if ($sent_to_company && $sent_to_customer) {
        echo json_encode(["status" => "success", "message" => "Email inviata con successo!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Errore nell'invio dell'email."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Richiesta non valida."]);
}
?>