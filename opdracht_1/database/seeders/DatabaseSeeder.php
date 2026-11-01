<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $sqlPath = base_path('db/jamin.sql');
        if (file_exists($sqlPath)) {
            $sql = file_get_contents($sqlPath);
            // Remove DROP/CREATE/USE DATABASE commands to operate inside the configured database
            $sql = preg_replace('/DROP\s+DATABASE[^\;]+;/i', '', $sql);
            $sql = preg_replace('/CREATE\s+DATABASE[^\;]+;/i', '', $sql);
            $sql = preg_replace('/USE\s+[^;]+;/i', '', $sql);

            // Extract DELIMITER $$ ... $$ DELIMITER ; blocks (Stored Procedures)
            $procedures = [];
            if (preg_match_all('/DELIMITER\s+\$\$\s*(.*?)\s*\$\$\s*DELIMITER\s*;/is', $sql, $matches)) {
                $procedures = $matches[1];
                $sql = preg_replace('/DELIMITER\s+\$\$\s*.*?\s*\$\$\s*DELIMITER\s*;/is', '', $sql);
            }

            $pdo = DB::connection()->getPdo();
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            $pdo->exec($sql);
            foreach ($procedures as $procedureSql) {
                $trimmed = trim($procedureSql);
                if ($trimmed !== '') {
                    $pdo->exec($trimmed);
                }
            }
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        if (!User::where('email', 'magazijn@jamin.nl')->exists()) {
            User::factory()->create([
                'name' => 'Timo Swart',
                'email' => 'magazijn@jamin.nl',
                'password' => bcrypt('password'),
                'rolename' => 'Magazijnmedewerker',
            ]);
        }
    }
}
