<header class="header_section">
    <div class="header_top">
        <div class="container-fluid header_top_container">
            @php
                $currentLocale = LaravelLocalization::getCurrentLocale();
                $newLocale = $currentLocale === 'ar' ? 'en' : 'ar';

                $flagCurrent = $currentLocale === 'ar' ? 'flag-syria.png' : 'flag-uk.png';
                $flagNew = $currentLocale === 'ar' ? 'flag-uk.png' : 'flag-syria.png';
                $countryName = $currentLocale === 'ar' ? 'سوريا' : 'English';
            @endphp

            <div class="lang_box dropdown">
                <a href="#" title="Language" class="nav-link" data-toggle="dropdown" aria-expanded="true">
                    <img src="{{ asset('assets-frontend/images/' . $flagCurrent) }}" alt="flag"
                        title="{{ $countryName }}">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div class="dropdown-menu">
                    <a href="{{ LaravelLocalization::getLocalizedURL($newLocale) }}" class="dropdown-item">
                        <img src="{{ asset('assets-frontend/images/' . $flagNew) }}" alt="flag">
                    </a>
                </div>
                <span>{{ $countryName }}</span>
            </div>

            <div class="contact_nav">
                <a href="tel:+963991291823">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span>
                        {{ __('web.call') }} : +963 991 291 823
                    </span>
                </a>
                <a href="mailto:info@albasel.com">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <span>
                        {{ __('web.email') }} : info@albasel.com
                    </span>
                </a>
            </div>
            <div class="social_box">
                <a href="https://www.facebook.com">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="https://www.instagram.com">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="header_bottom">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg custom_nav-container ">
                <a class="navbar-brand" href="/">
                    <img src="{{ asset('logo/logo1.png') }}" alt="">
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class=""> </span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav  ">
                        <li class="nav-item">
                            <a class="nav-link" href="/">{{ __('web.home') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#service">{{ __('web.services') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about">{{ __('web.about') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#project">{{ __('web.project') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#testimonial">{{ __('web.testimonial') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">{{ __('web.contact-us') }}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</header>
