<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false]);
    exit;
}

$nimi      = htmlspecialchars(trim($_POST['nimi'] ?? ''));
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$puhelin   = htmlspecialchars(trim($_POST['puhelin'] ?? ''));
$osoite    = htmlspecialchars(trim($_POST['osoite'] ?? ''));
$koko      = htmlspecialchars(trim($_POST['koko'] ?? ''));
$kerros    = htmlspecialchars(trim($_POST['kerros'] ?? ''));
$lisatiedot = htmlspecialchars(trim($_POST['lisatiedot'] ?? ''));

if (!$email) {
    echo json_encode(['ok' => false]);
    exit;
}

$to      = 'info@havenia.fi';
$subject = 'Kohde-ehdotus Havenialle | ' . $osoite;
$message = "Uusi kohde-ehdotus\n";
$message .= "==========================================\n\n";
$message .= "Yhteyshenkilö: $nimi\n";
$message .= "Sähköposti: $email\n";
$message .= "Puhelin: $puhelin\n\n";
$message .= "Kohteen tiedot:\n";
$message .= "Osoite: $osoite\n";
$message .= "Koko: $koko\n";
$message .= "Kerros: $kerros\n\n";
$message .= "Lisätiedot:\n$lisatiedot\n";
$headers  = "From: noreply@havenia.fi\r\nReply-To: $email";

$ok = mail($to, $subject, $message, $headers);
echo json_encode(['ok' => $ok]);
