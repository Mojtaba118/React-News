<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="{{mix("/css/style.css")}}">
        @yield("styles")
        <title>@yield("title","React News")</title>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                @yield("content")
            </div>
        </div>

        <script src="{{mix("/js/script.js")}}"></script>
        @yield("scripts")
    </body>
</html>
