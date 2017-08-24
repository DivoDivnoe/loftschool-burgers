<?php

$name     = $_POST['name'];
$phone    = $_POST['phone'];
$street   = $_POST['street'];
$house    = $_POST['house'];
$building = isset($_POST['building']) ? $_POST['building'] : '';
$flat     = $_POST['flat'];
$floor    = isset($_POST['floor']) ? $_POST['floor'] : '';
$comments = isset($_POST['comments']) ? $_POST['comments'] : '';
$pay      = $_POST['pay'] === 'card' ? 'по карте' : 'подготовить сдачу';
$callback = isset($_POST['callback']) ? 'да': 'нет';

$message = "
  <html>
    <head>Заявка</head>
    <body>
      <h2>Заказ</h2>
      <ul>
        <li>Имя: $name</li>
        <li>Телефон: $phone</li>
        <li>Улица: $street</li>
        <li>Дом: $house</li>
        <li>Корпус: $building</li>
        <li>Квартира: $flat</li>
        <li>Этаж: $floor</li>
        <li>Оплата: $pay</li>
        <li>Перезвонить: $callback</li>
      </ul>
    </body>
  </html>
";

$headers = "From: Администратор сайта <admin@loftschool.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

$mail = mail('andrey-tm203@mail.ru', 'Заказ', $message, $headers);

$data = [];

if ($mail) {
  $data['status'] = 'OK';
  $data['message'] = 'Сообщение отправлено';
} else {
  $data['status'] = 'NO';
  $data['message'] = 'Ошибка на сервере';
}

echo json_encode($data);

?>