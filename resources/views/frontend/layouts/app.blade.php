<!DOCTYPE html>
<html lang="en">

<head>

    @include('frontend.layouts.style')
    @yield('style')
</head>

<body>
    <div class="body"dir="{{ LaravelLocalization::getCurrentLocaleDirection() }}">
        <div class="hero_area">
            <!-- header section strats -->
            @include('frontend.layouts.header')

            <!-- end header section -->
            @include('frontend.sections.slider')
            <!-- slider section -->

            <!-- end slider section -->
        </div>

        <div role="main" class="main">

            @yield('content')

        </div>

        @include('frontend.layouts.footer')
    </div>

    @include('frontend.layouts.script')
    @yield('script')

</body>

</html>
