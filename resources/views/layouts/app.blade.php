<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="user" content="{{ Auth::user() }}">
    <link rel="manifest" href="/manifest.json">
    <title>{{ config('app.name', '') }}</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="css/vuetify.css" rel="stylesheet">
    <script>
        @auth
            window.Permissions = {!! json_encode(Auth::user()->allPermissions(), true) !!};
        @else
            window.Permissions = [];
        @endauth
    </script>
</head>
<body>
<div id="app">

    <v-app>

        <core-toolbar></core-toolbar>

        <core-drawer></core-drawer>

        <core-view>
            @yield('content')
        </core-view>
    </v-app>
</div>

<script src="{{ mix('js/app.js') }}"></script>

</body>
</html>
