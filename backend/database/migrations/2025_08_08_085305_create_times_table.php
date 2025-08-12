<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('times', function (Blueprint $table) {
            $table->id();
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->timestamps();
        });

        // 生成列を追加（STORED にすることでインデックスも可能）
        DB::statement("
            ALTER TABLE times
            MODIFY end_time TIME GENERATED ALWAYS AS (ADDTIME(start_time, '1:00:00')) STORED
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('times');
    }
};
