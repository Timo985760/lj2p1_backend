<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sqlPath = base_path('db/jamin.sql');
        if (file_exists($sqlPath)) {
            $sql = file_get_contents($sqlPath);
            // Strip database-level commands so it runs safely in the active test/dev database
            $sql = preg_replace('/DROP\s+DATABASE[^\;]+;/i', '', $sql);
            $sql = preg_replace('/CREATE\s+DATABASE[^\;]+;/i', '', $sql);
            $sql = preg_replace('/USE\s+[^;]+;/i', '', $sql);

            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::connection()->getPdo()->exec($sql);
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP TABLE IF EXISTS ProductPerLeverancier');
        DB::statement('DROP TABLE IF EXISTS ProductPerAllergeen');
        DB::statement('DROP TABLE IF EXISTS Magazijn');
        DB::statement('DROP TABLE IF EXISTS Leverancier');
        DB::statement('DROP TABLE IF EXISTS Allergeen');
        DB::statement('DROP TABLE IF EXISTS Product');
    }
};
