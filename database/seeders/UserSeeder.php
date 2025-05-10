<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'user_type_id' => 1,
                'company_id' => 1,
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'admin',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 2,
                'company_id' => 1,
                'name' => 'Project Manager',
                'email' => 'manager@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'manager',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 2,
                'company_id' => 1,
                'name' => 'Project Manager',
                'email' => 'project-manager@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'project-manager',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 3,
                'company_id' => 1,
                'name' => 'Developer',
                'email' => 'web-developer@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'web-developer',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 3,
                'company_id' => 1,
                'name' => 'Developer',
                'email' => 'app-developer@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'app-developer',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 3,
                'company_id' => 1,
                'name' => 'Developer',
                'email' => 'developer@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'developer',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 4,
                'company_id' => 1,
                'name' => 'Designer',
                'email' => 'designer@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'designer',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 4,
                'company_id' => 1,
                'name' => 'QA Engineer',
                'email' => 'qa@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'qa',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 1,
                'company_id' => 2,
                'name' => 'Admin',
                'email' => 'admin2@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'admin2',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 2,
                'company_id' => 2,
                'name' => 'Project Manager',
                'email' => 'manager2@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'manager2',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 3,
                'company_id' => 2,
                'name' => 'Developer',
                'email' => 'developer2@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'developer2',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 4,
                'company_id' => 2,
                'name' => 'Designer',
                'email' => 'designer2@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'designer2',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 1,
                'company_id' => 3,
                'name' => 'Admin',
                'email' => 'admin3@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'admin3',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 2,
                'company_id' => 3,
                'name' => 'Project Manager',
                'email' => 'manager3@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'manager3',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 3,
                'company_id' => 3,
                'name' => 'Developer',
                'email' => 'developer3@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'developer3',
                'created_at' => now(),
            ],
            [
                'user_type_id' => 4,
                'company_id' => 3,
                'name' => 'Designer',
                'email' => 'designer3@mail.com',
                'password' => bcrypt('12345678'),
                'username' => 'designer3',
                'created_at' => now(),
            ]
        ]);
    }
}
