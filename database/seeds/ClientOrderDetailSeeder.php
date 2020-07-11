<?php

use App\ClientOrderDetail;
use Illuminate\Database\Seeder;

class ClientOrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() 
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ClientOrderDetail::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        ClientOrderDetail::create([ 'clod_pk' => 1, 'clor_fk' => 1, 'prod_fk' => 1, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 2, 'clor_fk' => 1, 'prod_fk' => 2, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 3, 'clor_fk' => 1, 'prod_fk' => 3, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 4, 'clor_fk' => 1, 'prod_fk' => 4, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 5, 'clor_fk' => 1, 'prod_fk' => 5, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 6, 'clor_fk' => 1, 'prod_fk' => 6, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 7, 'clor_fk' => 1, 'prod_fk' => 7, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 8, 'clor_fk' => 1, 'prod_fk' => 8, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 9, 'clor_fk' => 1, 'prod_fk' => 9, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 10, 'clor_fk' => 1, 'prod_fk' => 10, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 11, 'clor_fk' => 1, 'prod_fk' => 11, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 12, 'clor_fk' => 1, 'prod_fk' => 12, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 13, 'clor_fk' => 1, 'prod_fk' => 13, 'meas_fk' => 4,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 14, 'clor_fk' => 2, 'prod_fk' => 14, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 15, 'clor_fk' => 2, 'prod_fk' => 15, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 16, 'clor_fk' => 2, 'prod_fk' => 16, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 17, 'clor_fk' => 2, 'prod_fk' => 17, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 18, 'clor_fk' => 2, 'prod_fk' => 18, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 19, 'clor_fk' => 2, 'prod_fk' => 19, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 20, 'clor_fk' => 2, 'prod_fk' => 20, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 21, 'clor_fk' => 2, 'prod_fk' => 21, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 22, 'clor_fk' => 2, 'prod_fk' => 22, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 23, 'clor_fk' => 2, 'prod_fk' => 23, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 24, 'clor_fk' => 2, 'prod_fk' => 24, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 25, 'clor_fk' => 2, 'prod_fk' => 25, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 26, 'clor_fk' => 2, 'prod_fk' => 26, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 27, 'clor_fk' => 2, 'prod_fk' => 27, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 28, 'clor_fk' => 2, 'prod_fk' => 28, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 29, 'clor_fk' => 2, 'prod_fk' => 29, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 30, 'clor_fk' => 2, 'prod_fk' => 30, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 31, 'clor_fk' => 2, 'prod_fk' => 31, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 32, 'clor_fk' => 3, 'prod_fk' => 32, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 33, 'clor_fk' => 3, 'prod_fk' => 33, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 34, 'clor_fk' => 3, 'prod_fk' => 34, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 35, 'clor_fk' => 3, 'prod_fk' => 35, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 36, 'clor_fk' => 3, 'prod_fk' => 36, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 37, 'clor_fk' => 3, 'prod_fk' => 37, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 38, 'clor_fk' => 3, 'prod_fk' => 38, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 39, 'clor_fk' => 3, 'prod_fk' => 39, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 40, 'clor_fk' => 3, 'prod_fk' => 40, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 41, 'clor_fk' => 3, 'prod_fk' => 41, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 42, 'clor_fk' => 3, 'prod_fk' => 42, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 43, 'clor_fk' => 3, 'prod_fk' => 43, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 44, 'clor_fk' => 3, 'prod_fk' => 44, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 45, 'clor_fk' => 3, 'prod_fk' => 45, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 46, 'clor_fk' => 3, 'prod_fk' => 46, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 47, 'clor_fk' => 3, 'prod_fk' => 47, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 48, 'clor_fk' => 3, 'prod_fk' => 48, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 49, 'clor_fk' => 3, 'prod_fk' => 49, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 50, 'clor_fk' => 3, 'prod_fk' => 50, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 51, 'clor_fk' => 3, 'prod_fk' => 51, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 52, 'clor_fk' => 3, 'prod_fk' => 52, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 53, 'clor_fk' => 3, 'prod_fk' => 53, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 54, 'clor_fk' => 3, 'prod_fk' => 54, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 55, 'clor_fk' => 4, 'prod_fk' => 55, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 56, 'clor_fk' => 4, 'prod_fk' => 56, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 57, 'clor_fk' => 4, 'prod_fk' => 57, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 58, 'clor_fk' => 4, 'prod_fk' => 58, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 59, 'clor_fk' => 4, 'prod_fk' => 59, 'meas_fk' => 3,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 60, 'clor_fk' => 4, 'prod_fk' => 60, 'meas_fk' => 4,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 61, 'clor_fk' => 4, 'prod_fk' => 61, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 62, 'clor_fk' => 4, 'prod_fk' => 62, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 63, 'clor_fk' => 4, 'prod_fk' => 63, 'meas_fk' => 1,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 64, 'clor_fk' => 4, 'prod_fk' => 64, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 65, 'clor_fk' => 4, 'prod_fk' => 65, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 66, 'clor_fk' => 4, 'prod_fk' => 66, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 67, 'clor_fk' => 4, 'prod_fk' => 67, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 68, 'clor_fk' => 4, 'prod_fk' => 68, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 69, 'clor_fk' => 4, 'prod_fk' => 69, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 70, 'clor_fk' => 5, 'prod_fk' => 70, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 71, 'clor_fk' => 5, 'prod_fk' => 71, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 72, 'clor_fk' => 5, 'prod_fk' => 72, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 73, 'clor_fk' => 5, 'prod_fk' => 73, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 74, 'clor_fk' => 5, 'prod_fk' => 74, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 75, 'clor_fk' => 5, 'prod_fk' => 75, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 76, 'clor_fk' => 5, 'prod_fk' => 76, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 77, 'clor_fk' => 5, 'prod_fk' => 77, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 78, 'clor_fk' => 5, 'prod_fk' => 78, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 79, 'clor_fk' => 5, 'prod_fk' => 79, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 80, 'clor_fk' => 5, 'prod_fk' => 80, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 81, 'clor_fk' => 5, 'prod_fk' => 81, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 82, 'clor_fk' => 6, 'prod_fk' => 82, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 83, 'clor_fk' => 6, 'prod_fk' => 83, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 84, 'clor_fk' => 6, 'prod_fk' => 84, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 85, 'clor_fk' => 6, 'prod_fk' => 85, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 86, 'clor_fk' => 6, 'prod_fk' => 86, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 87, 'clor_fk' => 6, 'prod_fk' => 87, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 88, 'clor_fk' => 6, 'prod_fk' => 88, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 89, 'clor_fk' => 6, 'prod_fk' => 89, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 90, 'clor_fk' => 6, 'prod_fk' => 90, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 91, 'clor_fk' => 6, 'prod_fk' => 91, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 92, 'clor_fk' => 6, 'prod_fk' => 92, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 93, 'clor_fk' => 6, 'prod_fk' => 93, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 94, 'clor_fk' => 6, 'prod_fk' => 94, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 95, 'clor_fk' => 6, 'prod_fk' => 95, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 96, 'clor_fk' => 6, 'prod_fk' => 96, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 97, 'clor_fk' => 6, 'prod_fk' => 97, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 98, 'clor_fk' => 6, 'prod_fk' => 98, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 99, 'clor_fk' => 6, 'prod_fk' => 99, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 100, 'clor_fk' => 6, 'prod_fk' => 100, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 101, 'clor_fk' => 6, 'prod_fk' => 101, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 102, 'clor_fk' => 6, 'prod_fk' => 102, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 103, 'clor_fk' => 7, 'prod_fk' => 103, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 104, 'clor_fk' => 7, 'prod_fk' => 104, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 105, 'clor_fk' => 7, 'prod_fk' => 105, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 106, 'clor_fk' => 7, 'prod_fk' => 106, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 107, 'clor_fk' => 7, 'prod_fk' => 107, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 108, 'clor_fk' => 7, 'prod_fk' => 108, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 109, 'clor_fk' => 7, 'prod_fk' => 109, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 110, 'clor_fk' => 7, 'prod_fk' => 110, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 111, 'clor_fk' => 7, 'prod_fk' => 111, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 112, 'clor_fk' => 7, 'prod_fk' => 112, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 113, 'clor_fk' => 7, 'prod_fk' => 113, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 114, 'clor_fk' => 7, 'prod_fk' => 114, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 115, 'clor_fk' => 7, 'prod_fk' => 115, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 116, 'clor_fk' => 7, 'prod_fk' => 116, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 117, 'clor_fk' => 7, 'prod_fk' => 117, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 118, 'clor_fk' => 7, 'prod_fk' => 118, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 119, 'clor_fk' => 7, 'prod_fk' => 119, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 120, 'clor_fk' => 7, 'prod_fk' => 120, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 121, 'clor_fk' => 7, 'prod_fk' => 121, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 122, 'clor_fk' => 7, 'prod_fk' => 122, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 123, 'clor_fk' => 7, 'prod_fk' => 123, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 124, 'clor_fk' => 7, 'prod_fk' => 124, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 125, 'clor_fk' => 7, 'prod_fk' => 125, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 126, 'clor_fk' => 7, 'prod_fk' => 126, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 127, 'clor_fk' => 7, 'prod_fk' => 127, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 128, 'clor_fk' => 7, 'prod_fk' => 128, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 129, 'clor_fk' => 7, 'prod_fk' => 129, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 130, 'clor_fk' => 7, 'prod_fk' => 130, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 131, 'clor_fk' => 7, 'prod_fk' => 131, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 132, 'clor_fk' => 7, 'prod_fk' => 132, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 133, 'clor_fk' => 7, 'prod_fk' => 133, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 134, 'clor_fk' => 7, 'prod_fk' => 134, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);
        ClientOrderDetail::create([ 'clod_pk' => 135, 'clor_fk' => 7, 'prod_fk' => 135, 'meas_fk' => 2,  'clod_quantity' => 5, 'clod_price' => 100, 'clod_discountrate' => 0, 'clod_ieps' => 0, 'clod_iva' => 16.5 ]);

    }
}
