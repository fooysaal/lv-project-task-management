<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->index();
            $table->foreignId('team_id')->nullable()->index();
            $table->foreignId('project_category_id')->nullable()->index();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('status')->default(0);
            $table->string('priority')->default(0);
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('progress')->default(0);
            $table->string('budget')->nullable();
            $table->string('currency')->default('USD');
            $table->string('attachments')->nullable();
            $table->timestamps();
            $table->softDeletes();
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
