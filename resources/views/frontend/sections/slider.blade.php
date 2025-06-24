<style>
    .rtl-text {
        direction: rtl;
        text-align: right;
    }

    .ltr-text {
        direction: ltr;
        text-align: left;
    }
</style>
<style>
    html {
        scroll-behavior: smooth;
    }
</style>
<section class="slider_section">
    <div id="customCarousel1" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="container ">
                    <div class="row">
                        <div class="col-md-10 mx-auto">
                            <div class="detail-box">
                                <h1
                                    class="{{ LaravelLocalization::getCurrentLocale() === 'ar' ? 'rtl-text' : 'ltr-text' }}">
                                    {{ __('web.al-basel-general-contracting-company') }}
                                    {{-- <br>
                                    {{ __('web.committed-to-delivering-residential-commercial-and-industrial-projects-with-top-quality') }}
                                    <br>
                                    {{ __('web.always-on-time-and-providing-professional-service-that-meets-your-expectations') }} --}}
                                </h1>
                                <div class="btn-box">
                                    <a href="#contact" class="btn1">
                                        {{ __('web.contact-us') }}
                                    </a>
                                    <a href="#about" class="btn2">
                                        {{ __('web.about-us') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="container ">
                    <div class="row">
                        <div class="col-md-10 mx-auto">
                            <div class="detail-box">
                                <h1
                                    class="{{ LaravelLocalization::getCurrentLocale() === 'ar' ? 'rtl-text' : 'ltr-text' }}">
                                    {{ __('web.al-basel-general-contracting-company') }}
                                    {{-- <br>
                                    {{ __('web.committed-to-delivering-residential-commercial-and-industrial-projects-with-top-quality') }}
                                    <br>
                                    {{ __('web.always-on-time-and-providing-professional-service-that-meets-your-expectations') }} --}}
                                </h1>
                                <div class="btn-box">
                                    <a href="#contact" class="btn1">
                                        {{ __('web.contact-us') }}
                                    </a>
                                    <a href="#about" class="btn2">
                                        {{ __('web.about-us') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ol class="carousel-indicators">
            <li data-target="#customCarousel1" data-slide-to="0" class="active"></li>
            <li data-target="#customCarousel1" data-slide-to="1"></li>
        </ol>
    </div>

</section>
