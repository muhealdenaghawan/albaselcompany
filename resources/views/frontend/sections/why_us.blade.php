<style>
    .detail-box {
        margin-top: 20px !important;
    }

    .why_us_container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .why_us_container .box {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
        margin-bottom: 30px;
    }

    /* نص واتجاه LTR */
    .why_us_container .detail-box {
        text-align: left;
        margin-left: 20px;
    }

    /* اتجاه RTL */
    [dir="rtl"] .why_us_container .box {
        flex-direction: row-reverse;
    }

    [dir="rtl"] .why_us_container .detail-box {
        text-align: right;
        margin-left: 0;
        margin-right: 20px;
    }
</style>
<section class="why_us_section layout_padding">
    <div class="container">
        <div class="heading_container">
            <h2>
                {{ __('web.why-choose-us?') }}
            </h2>
        </div>
        <div class="why_us_container">
            <div class="box">
                <div class="img-box">
                    <img src="{{ asset('assets-frontend/images/w1.png') }}" alt="">
                </div>
                <div class="detail-box">
                    <h5>
                        {{ __('web.completing-projects-on-time') }}
                    </h5>
                    <p>
                        {{ __('web.At Al-Basel General Contracting Company, we are committed to delivering projects on time without delay. We believe that respecting timelines is the foundation of trust between us and our clients. That is why we develop precise, well-thought-out execution plans and adhere to them with utmost dedication.') }}
                    </p>
                </div>
            </div>
            <div class="box">
                <div class="img-box">
                    <img src="{{ asset('assets-frontend/images/w2.png') }}" alt="">
                </div>
                <div class="detail-box">
                    <h5>
                        {{ __('web.Always here to serve you') }}
                    </h5>
                    <p>
                        {{ __('web.Our team is always available to communicate and respond to your inquiries throughout all stages of the project. Whether you need an update, technical consultation, or immediate support, we are here to serve you with efficiency and professionalism.') }}
                    </p>
                </div>
            </div>
            <div class="box">
                <div class="img-box">
                    <img src="{{ asset('assets-frontend/images/w3.png') }}" alt="">
                </div>
                <div class="detail-box">
                    <h5>
                        {{ __('web.professionalism-and-high-responsibility') }}
                    </h5>
                    <p>
                        {{ __('web.We approach each project with the utmost professionalism and responsibility, from the planning stage to final delivery. We are committed to using the best engineering standards and the latest technologies to ensure quality work and customer satisfaction.') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
