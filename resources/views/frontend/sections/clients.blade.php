<style>
    /* الاتجاه LTR */
    .client_section .box {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    /* الاتجاه RTL */
    [dir="rtl"] .client_section .box {
        flex-direction: row-reverse;
        text-align: right;
    }
</style>
<section class="client_section layout_padding" id="testimonial">
    <div class="container">
        <div class="heading_container heading_center">
            <h2>
                {{ __('web.testimonial') }}
            </h2>
        </div>
    </div>
    <div id="customCarousel2" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 mx-auto">
                            <div class="box">
                                <div class="img-box">
                                    <img src="{{ asset('default-images/avatar-1.jpg') }}" alt="">
                                </div>
                                <div class="detail-box">
                                    <div class="client_info">
                                        <div class="client_name">
                                            <h5>
                                                {{ __('web.morojink') }}
                                            </h5>
                                            <h6>
                                                {{ __('web.customer') }}
                                            </h6>
                                        </div>
                                        <i class="fa fa-quote-left" aria-hidden="true"></i>
                                    </div>
                                    <p>
                                        {{ __('web.Al-Basel Contracting exceeded our expectations. Their team was professional, responsive, and delivered our project on time with outstanding quality. We truly appreciate their commitment and attention to detail.') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 mx-auto">
                            <div class="box">
                                <div class="img-box">
                                    <img src="{{ asset('default-images/avatar-1.jpg') }}" alt="">
                                </div>
                                <div class="detail-box">
                                    <div class="client_info">
                                        <div class="client_name">
                                            <h5>
                                                {{ __('web.morojink') }}
                                            </h5>
                                            <h6>
                                                {{ __('web.customer') }}
                                            </h6>
                                        </div>
                                        <i class="fa fa-quote-left" aria-hidden="true"></i>
                                    </div>
                                    <p>
                                        {{ __('web.Al-Basel Contracting exceeded our expectations. Their team was professional, responsive, and delivered our project on time with outstanding quality. We truly appreciate their commitment and attention to detail.') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 mx-auto">
                            <div class="box">
                                <div class="img-box">
                                    <img src="{{ asset('default-images/avatar-1.jpg') }}" alt="">
                                </div>
                                <div class="detail-box">
                                    <div class="client_info">
                                        <div class="client_name">
                                            <h5>
                                                {{ __('web.morojink') }}
                                            </h5>
                                            <h6>
                                                {{ __('web.customer') }}
                                            </h6>
                                        </div>
                                        <i class="fa fa-quote-left" aria-hidden="true"></i>
                                    </div>
                                    <p>
                                        {{ __('web.Al-Basel Contracting exceeded our expectations. Their team was professional, responsive, and delivered our project on time with outstanding quality. We truly appreciate their commitment and attention to detail.') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ol class="carousel-indicators">
            <li data-target="#customCarousel2" data-slide-to="0" class="active"></li>
            <li data-target="#customCarousel2" data-slide-to="1"></li>
            <li data-target="#customCarousel2" data-slide-to="2"></li>
        </ol>
    </div>
</section>
