<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            [
                'name' => 'Tech Innovations',
                'email' => 'tech@innovation.com',
                'phone' => '123-456-7890',
                'address' => '123 Tech Lane, Silicon Valley, CA',
                'website' => 'www.techinnovations.com',
                'country' => 'USA',
                'created_at' => now(),
            ],
            [
                'name' => 'Creative Designs',
                'email' => 'creative@designs.com',
                'phone' => '987-654-3210',
                'address' => '456 Design St, New York, NY',
                'website' => 'www.creativedesigns.com',
                'country' => 'USA',
                'created_at' => now(),
            ],
            [
                'name' => 'Global Logistics',
                'email' => 'global@logistics.com',
                'phone' => '555-123-4567',
                'address' => '789 Logistics Ave, Chicago, IL',
                'website' => 'www.globallogistics.com',
                'country' => 'USA',
                'created_at' => now(),
            ],
        ]);
    }
}
