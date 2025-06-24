@extends('frontend.layouts.app')
@section('style')
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
@endsection
@section('content')
    <!-- service section -->
    @include('frontend.sections.services')
    <!-- end service section -->

    <!-- about section -->
    @include('frontend.sections.about')
    <br>
    <!-- end about section -->

    <!-- project section -->
    @include('frontend.sections.projects')
    <!-- end project section -->

    <!-- client section -->
    @include('frontend.sections.clients')
    <!-- end client section -->

    <!-- why us section -->
    @include('frontend.sections.why_us')
    <!-- end why us section -->

    <!-- contact section -->
    @include('frontend.sections.contact')
    <!-- end contact section -->

    <!-- info section -->
    @include('frontend.sections.info')
    <!-- end info section -->
@endsection
