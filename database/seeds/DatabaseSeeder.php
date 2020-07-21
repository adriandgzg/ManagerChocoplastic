<?php

use App\ClientSale;
use App\ClientSaleDetail;
use App\DevCode;
use App\Measurement;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DevCodeSeeder::class); 
        $this->call(SystemSeeder::class); 
        $this->call(PaymentMethodSeeder::class); 
        $this->call(PaymentShapeSeeder::class); 
        $this->call(FederalEntitySeeder::class);
        $this->call(StoreSeeder::class);
        $this->call(MeasurementSeeder::class);
        $this->call(ProductCategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(ClientSeeder::class);
        //$this->call(ClientOrderSeeder::class);
        //$this->call(ClientOrderDetailSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProviderSeeder::class);
        $this->call(ReturnMotiveSeeder::class);
    }
}
