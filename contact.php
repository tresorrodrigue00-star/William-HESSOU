<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des valeurs du formulaire
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation simple
    if (!empty($name) && !empty($email) && !empty($message)) {

        // Destinataire et sujet
        $to = "williamhessou362@gmail.com";
        $subject = "Nouveau message de $name";

        // Contenu du mail
        $body = "Nom: $name\nEmail: $email\nMessage:\n$message";

        // En-têtes
        $headers = "From: $email\r\nReply-To: $email";

        // Envoi du mail
        if (mail($to, $subject, $body, $headers)) {
            echo "Merci, votre message a été envoyé !";
        } else {
            echo "Erreur lors de l'envoi, veuillez réessayer.";
        }
    } else {
        echo "Merci de remplir tous les champs.";
    }
} else {
    echo "Méthode invalide.";
}

if(mail(...)) {
    header("Location: merci.html");
    exit;
}

?>
