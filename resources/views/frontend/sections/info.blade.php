<section class="info_section">
    <div class="container">
        <div class="contact_nav">
            <a href="tel:+963991291823"  dir="ltr">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span>{{ __('web.call') }} :</span>
                <span style="direction: ltr; unicode-bidi: embed;">+963 991 291 823</span>
            </a>


            <a href="mailto:info@albasel.com" dir="ltr">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span>{{ __('web.email') }} :</span>
                <span style="direction: ltr; unicode-bidi: embed;">info@albasel.com</span>
            </a>
        </div>

        <div class="info_top ">
            <div class="row info_main_row">
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="info_links">
                        <h4>
                            {{ __('web.quick-links') }}
                        </h4>
                        <div class="info_links_menu">
                            <a class="" href="/">{{ __('web.home') }}</a>
                            <a class="" href="#service">{{ __('web.services') }}</a>
                            <a class="" href="#about"> {{ __('web.about') }}</a>
                            <a class="" href="#project">{{ __('web.project') }}</a>
                            <a class="" href="#testimonial">{{ __('web.testimonial') }}</a>
                            <a class="" href="#contact">{{ __('web.contact-us') }}</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-3 mx-auto">
                    <div class="info_post">
                        <h5>
                            {{-- INSTAGRAM FEEDS --}}
                        </h5>
                        <div class="post_box">
                            {{-- <div class="img-box">
                                <img src="{{ asset('assets-frontend/images/instagram.jpg') }}" alt="">
                            </div>
                            <div class="img-box">
                                <img src="{{ asset('assets-frontend/images/instagram.jpg') }}" alt="">
                            </div>
                            <div class="img-box">
                                <img src="{{ asset('assets-frontend/images/instagram.jpg') }}" alt="">
                            </div>
                            <div class="img-box">
                                <img src="{{ asset('assets-frontend/images/instagram.jpg') }}" alt="">
                            </div>
                            <div class="img-box">
                                <img src="{{ asset('assets-frontend/images/instagram.jpg') }}" alt="">
                            </div>
                            <div class="img-box">
                                <img src="{{ asset('assets-frontend/images/instagram.jpg') }}" alt="">
                            </div> --}}
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="info_form">
                        <h4>
                            {{ __('web.sign-up-to-our-newsletter') }}
                        </h4>
                        <form action="">
                            <input type="text" />
                            <button type="submit">
                                {{ __('web.subscribe') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_bottom">
            <div class="row">
                <div class="col-md-2">
                    <div class="info_logo">
                        <a href="">
                            <img src="{{ asset('logo/logo1.png') }}" alt="">
                        </a>
                    </div>
                </div>
                <div class="col-md-4 ml-auto">
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

        </div>
    </div>
</section>
