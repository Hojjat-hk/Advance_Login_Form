<?php
declare(strict_types=1);
require_once("../Classes/Session.php");

Session::navigateIfSessionIsInvalid("../Login.php");

// TODO: Extend behavior if necessary
session_unset();
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="author" content="Hojjat Hekmatipour">
    <link rel="stylesheet" type="text/css" href="../Styles/Registration-Successful.css">
    <link rel="stylesheet" type="text/css" href="../Styles/Main.css">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Real world | Login Successful !</title>
</head>
<body class="d-flex jst-cnt-cntr alg-itm-cntr">
<section class="container d-flex jst-cnt-cntr alg-itm-cntr">
    <div class="successful-picture">
        <img src="../Asset/Pic/Correct-tick.svg" alt="successful picture">
    </div>
    <h3 class="successful-text">
        Login Successful!
    </h3>
    <p>You have successfully signed in to your account. <br> You can now close this window and continue to the website.</p>
    <button class="close-window">
        <div id="btnCircleScale"></div>
        <span>Close Window</span>
    </button>
</section>
<script>
    const closeButton = document.querySelector(".close-window");
    closeButton.addEventListener("click", (event) => {
        window.close();
    });
</script>
</body>
</html>
