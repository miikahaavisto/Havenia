<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false]);
    exit;
}

$nimi    = htmlspecialchars(trim($_POST['nimi'] ?? ''));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$puhelin = htmlspecialchars(trim($_POST['puhelin'] ?? ''));
$aihe    = htmlspecialchars(trim($_POST['aihe'] ?? ''));
$viesti  = htmlspecialchars(trim($_POST['viesti'] ?? ''));

if (!$email) {
    echo json_encode(['ok' => false, 'error' => 'Virheellinen sähköpostiosoite']);
    exit;
}

$to      = 'info@havenia.fi';
$subject = 'Yhteydenotto — Havenia Tuulensuu | ' . $aihe;
$message = "Yhteydenotto Havenia Tuulensuu -kohteesta\n";
$message .= "==========================================\n\n";
$message .= "Nimi: $nimi\n";
$message .= "Sähköposti: $email\n";
$message .= "Puhelin: $puhelin\n";
$message .= "Kiinnostus: $aihe\n\n";
$message .= "Viesti:\n$viesti\n";
$headers  = "From: noreply@havenia.fi\r\nReply-To: $email";

$ok = mail($to, $subject, $message, $headers);
echo json_encode(['ok' => $ok]);
