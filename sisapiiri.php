<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false]);
    exit;
}

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
if (!$email) {
    echo json_encode(['ok' => false, 'error' => 'Virheellinen sähköpostiosoite']);
    exit;
}

$to      = 'info@havenia.fi';
$subject = 'Liityn Havenia sisäpiiriin';
$message = "Uusi sisäpiiriläinen:\n\n" . $email;
$headers = "From: noreply@havenia.fi\r\nReply-To: " . $email;

$ok = mail($to, $subject, $message, $headers);
echo json_encode(['ok' => $ok]);
