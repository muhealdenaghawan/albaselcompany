<section class="contact_section layout_padding-bottom" id="contact">
    <div class="container-fluid">
        <div class="col-lg-4 col-md-5 offset-md-1">
            <div class="heading_container">
                <h2>
                    {{ __('web.contact-us') }}
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-5 offset-md-1">
                <div class="form_container">
                    <form action="">
                        <div>
                            <input type="text" placeholder="{{ __('web.your-name') }}" />
                        </div>
                        <div>
                            <input type="text" placeholder="{{ __('web.phone-number') }}" />
                        </div>
                        <div>
                            <input type="email" placeholder="{{ __('web.email') }}" />
                        </div>
                        <div>
                            <input type="text" class="message-box" placeholder="{{ __('web.message') }}" />
                        </div>
                        <div class="btn_box">
                            <button>
                                {{ __('web.send') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-7 col-md-6 px-0">
                <div class="map_container">
                    <div class="map">
                        <div id="googleMap"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
