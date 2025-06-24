<?php

use App\Enums\ProjectsStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->references('id')->on('users')->onDelete('cascade')->default(null);
            $table->string('title');
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->text('description');
            $table->string('location');
            $table->enum('status', ProjectsStatus::getValues())->default(ProjectsStatus::PENDING);
            $table->decimal('quote_price', 12, 2)->default(0);
            $table->string('slug')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
