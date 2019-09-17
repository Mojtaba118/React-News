<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{mix("/css/admin.css")}}">
    <title>پنل مدیریت React News</title>
</head>
<body>
    <div id="root"></div>
    <script src="{{mix("/js/admin.js")}}"></script>
</body>
</html>
