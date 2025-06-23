 <!-- project section -->
 <section class="project_section layout_padding" id="project" dir="ltr">
     <div class="container">
         <div class="heading_container">
             <h2>
                 {{ __('web.projects') }}
             </h2>
         </div>
         <div class="carousel-wrap">
             <div class="filter_box">
                 <h6>
                     {{ __('web.category_filter') }}
                 </h6>
                 <nav class="owl-filter-bar">
                     <a href="#" class="item active" data-owl-filter="*">{{ __('web.all') }}</a>
                     <a href="#" class="item" data-owl-filter=".painting">{{ __('web.painting') }}</a>
                     <a href="#" class="item" data-owl-filter=".reconstruction">{{ __('web.reconstruction') }}</a>
                     <a href="#" class="item" data-owl-filter=".repair">{{ __('web.repairs') }}</a>
                     <a href="#" class="item" data-owl-filter=".residential">{{ __('web.residential') }}</a>
                     <a href="#" class="item" data-owl-filter=".styling">{{ __('web.styling') }}</a>
                 </nav>
             </div>

             <div class="owl-carousel project_carousel">
                 <div class="item painting">
                     <div class="box">
                         <div class="img-box">
                             <img src="{{ asset('images/1.jpeg') }}" alt="" />
                             <a href="" class="pin_link">
                                 <i class="fa fa-link" aria-hidden="true"></i>
                             </a>
                         </div>
                         <div class="detail-box">
                             <h5>
                                {{ __('web.interior_work') }}
                             </h5>
                             <p>
                                {{ __('web.alteration_in_some_form_by_injected_humour_or_randomised_words_which_do_not_look_even_slightly_believable_if_you_are_going_to_use') }}
                             </p>
                         </div>
                     </div>
                 </div>
                 <div class="item reconstruction">
                     <div class="box">
                         <div class="img-box">
                             <img src="{{ asset('images/2.jpeg') }}" alt="" />
                             <a href="" class="pin_link">
                                 <i class="fa fa-link" aria-hidden="true"></i>
                             </a>
                         </div>
                         <div class="detail-box">
                             <h5>
                                {{ __('web.interior_work') }}
                             </h5>
                             <p>
                                {{ __('web.alteration_in_some_form_by_injected_humour_or_randomised_words_which_do_not_look_even_slightly_believable_if_you_are_going_to_use') }}
                             </p>
                         </div>
                     </div>
                 </div>
                 <div class="item repair">
                     <div class="box">
                         <div class="img-box">
                             <img src="{{ asset('images/6.jpeg') }}" alt="" />
                             <a href="" class="pin_link">
                                 <i class="fa fa-link" aria-hidden="true"></i>
                             </a>
                         </div>
                         <div class="detail-box">
                             <h5>
                                {{ __('web.interior_work') }}
                             </h5>
                             <p>
                                {{ __('web.alteration_in_some_form_by_injected_humour_or_randomised_words_which_do_not_look_even_slightly_believable_if_you_are_going_to_use') }}
                             </p>
                         </div>
                     </div>
                 </div>
                 <div class="item residential">
                     <div class="box">
                         <div class="img-box">
                             <img src="{{ asset('images/4.jpeg') }}" alt="" />
                             <a href="" class="pin_link">
                                 <i class="fa fa-link" aria-hidden="true"></i>
                             </a>
                         </div>
                         <div class="detail-box">
                             <h5>
                                {{ __('web.interior_work') }}
                             </h5>
                             <p>
                                {{ __('web.alteration_in_some_form_by_injected_humour_or_randomised_words_which_do_not_look_even_slightly_believable_if_you_are_going_to_use') }}
                             </p>
                         </div>
                     </div>
                 </div>
                 <div class="item styling">
                     <div class="box">
                         <div class="img-box">
                             <img src="{{ asset('images/5.jpeg') }}" alt="" />
                             <a href="" class="pin_link">
                                 <i class="fa fa-link" aria-hidden="true"></i>
                             </a>
                         </div>
                         <div class="detail-box">
                             <h5>
                                {{ __('web.interior_work') }}
                             </h5>
                             <p>
                                {{ __('web.alteration_in_some_form_by_injected_humour_or_randomised_words_which_do_not_look_even_slightly_believable_if_you_are_going_to_use') }}
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </section>
 <!-- end project section -->
