<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        User::create([
            'name' => 'Fran Alvarez',
            'email' => 'fran@chocoplastic.com',
            'phone_number' => '0001',
            'stor_fk' => 1,
            'verified' => 1,
            'password' => Hash::make('Abc0001')
        ]);

        User::create([
            'name' => 'Jose Bernabe Ricardez',
            'email' => 'JBR@chocoplastic.com',
            'phone_number' => '0002',
            'stor_fk' => 2,
            'verified' => 1,
            'password' => Hash::make('Abc0002')
        ]);

        User::create([
            'name' => 'Adrian Dominguez',
            'email' => 'Adrian@chocoplastic.com',
            'phone_number' => '0003',
            'stor_fk' => 3,
            'verified' => 1,
            'password' => Hash::make('Abc0003')
        ]);
    }
}
