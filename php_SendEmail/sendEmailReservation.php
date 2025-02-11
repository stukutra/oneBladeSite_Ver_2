<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// header("Access-Control-Allow-Origin: *");

// Impostazioni email
$to = "business@oneblade.it"; // Email destinatario principale
$api_key = "7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6";

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

    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => "Il campo 'Email' è richiesto."]);
        exit();
    }

    // Oggetto della mail per il destinatario principale
    $subject = "Prenotazione corso oneBladeLAB - $course";

    // Corpo del messaggio per l'azienda
    $body = "Nuova prenotazione per il corso \"$course\".\n\n";
    $body .= "Dettagli della prenotazione:\n";
    $body .= "Nome: $name\n";
    $body .= "Telefono: $telephone\n";
    $body .= "Email: $email\n\n";

    // Firma in calce all'email
    $signature = "oneBlade S.r.l.\n";
    $signature .= "Via Di Valle Lupare 10, 00127\n";
    $signature .= "P.IVA/C.F. 16510411008\n";
    $signature .= "REA RM1571017\n";
    $signature .= "Capitale Sociale 10.000 € Int. Ver.\n";
    $signature .= "https://www.oneblade.it\n";
    $signature .= "info@oneblade.it\n\n";
    $signature .= "------------------------------------------\n";
    $signature .= "*Rispetta l'ambiente - È veramente necessario stampare questa e-mail?*\n";
    $signature .= "Ai sensi del D.lgs n. 196 del 30.06.03 (Codice Privacy), le informazioni contenute in questo messaggio\n";
    $signature .= "sono riservate e ad uso esclusivo del destinatario. Qualora il messaggio in parola Le fosse pervenuto per errore,\n";
    $signature .= "La preghiamo di eliminarlo senza copiarlo e di non inoltrarlo a terzi, dandocene gentilmente comunicazione. Grazie.\n\n";
    $signature .= "*Please consider the environment - do you really need to print this e-mail?*\n";
    $signature .= "This message, for the D.lgs n. 196 / 30.06.03 (Privacy Code), may contain confidential and/or privileged information.\n";
    $signature .= "If you are not the addressee or authorized to receive this for the addressee, you must not use, copy, disclose or\n";
    $signature .= "take any action based on this message or any information herein. If you have received this message in error,\n";
    $signature .= "please advise the sender immediately by reply e-mail and delete this message. Thank you for your cooperation.\n";

    // Aggiunge la firma all'email
    $body .= $signature;

    // Headers dell'email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Invia l'email all'azienda
    $sent_to_company = mail($to, $subject, $body, $headers);

    // **Invio della conferma all'utente**
    $customer_subject = "Conferma prenotazione corso - $course";
    $customer_body = "Gentile $name,\n\n";
    $customer_body .= "Grazie per aver effettuato la prenotazione per il corso \"$course\" su OneBladeLAB.\n\n";
    $customer_body .= "A breve verrai contattato per ricevere tutti i dettagli relativi alla tua partecipazione.\n";
    $customer_body .= "Se hai domande, non esitare a contattarci.\n\n";
    $customer_body .= $signature; // Aggiunge la firma anche alla mail per il cliente

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