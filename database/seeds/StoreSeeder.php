<?php

use App\Store;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Store::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Store::create([
            'stor_identifier' => "bodega",
            'stor_rfc' => "",
            'stor_businessname' => "GABRIELA OCOTL GARCIA",
            'stor_name' => "LA BODEGA DE CHOCOPLASTIC",
            'stor_phone' => "993 350 4907",
            'stor_cellphone' => "993 426 7649",
            'stor_addres' => "AVENIDA JOSE MARIA PINOSUAREZ 812 COLONIA CENTRO CP86000 VILLAHERMOSA CENTRO TABASCO",
            'stor_main' => true
        ]);

        Store::create([
            'stor_identifier' => "pinosuarez1",
            'stor_rfc' => "",
            'stor_businessname' => "GABRIELA OCOTL GARCIA",
            'stor_name' => "LA TIENDITA DE CHOCOPLASTIC",
            'stor_phone' => "993 131 1432",
            'stor_cellphone' => "993 117 8500",
            'stor_addres' => "AVENIDA JOSE MARIA PINOSUAREZ 812 COLONIA CENTRO CP86000 VILLAHERMOSA CENTRO TABASCO",
            'stor_main' => false
        ]);

        Store::create([
            'stor_identifier' => "pinosuarez 2",
            'stor_rfc' => "",
            'stor_businessname' => "HIPOLITO ROMERO OCELOTL",
            'stor_name' => "LA TIENDITA DE CHOCOPLASTIC",
            'stor_phone' => "993 151 5277",
            'stor_cellphone' => "993 108 5980",
            'stor_addres' => "AVENIDA JOSEMARIA PINOSUAREZ 654 COLONIA CENTRO CP 86000 VILLAHERMOSA CENTRO TABASCO",
            'stor_main' => false
        ]);

        Store::create([
            'stor_identifier' => "pinosuarez 3",
            'stor_rfc' => "",
            'stor_businessname' => "OSCAR GENARO ROMERO OCELOTL",
            'stor_name' => "LA TIENDITA DE CHOCOPLASTIC",
            'stor_phone' => "993 313 7981",
            'stor_cellphone' => "993 117 8509",
            'stor_addres' => "BULEVAR ADOLFO RUIZ CORTINEZ 102A COLONIA CASA BLANCACP 86060 VILLAHERMOSA CENTRO",
            'stor_main' => false
        ]);

        Store::create([
            'stor_identifier' => "ximenita",
            'stor_rfc' => "",
            'stor_businessname' => "JENNY GUADALUPE SILVAN MORENO",
            'stor_name' => "MATERIAS PRIMAS XIMENITA",
            'stor_phone' => "993 161 7446",
            'stor_cellphone' => "993 108 7634",
            'stor_addres' => "AVENIDA JOSE MARIA PINOSUAREZ COLONIA CENTRO CP86000 VILLAHERMOSA CENTRO TABASCO",
            'stor_main' => false
        ]);

        Store::create([
            'stor_identifier' => "central de abastos",
            'stor_rfc' => "",
            'stor_businessname' => "OSCAR GENARO ROMERO OCELOTL",
            'stor_name' => "LA TIENDITA DEL ESQUINA",
            'stor_phone' => "",
            'stor_cellphone' => "993 108 5561",
            'stor_addres' => "NAVE 2 SN ",
            'stor_main' => false
        ]);

        Store::create([
            'stor_identifier' => "TAMULTE",
            'stor_rfc' => "",
            'stor_businessname' => "HIPOLITO ROMERO OCELOTL",
            'stor_name' => "EL COLORADO",
            'stor_phone' => "993 413 6923",
            'stor_cellphone' => "993 108 5565",
            'stor_addres' => "AGUSTIN DE ITURBIDE 512 COLONIA TAMULTE CP 86150 VILLAHERMOSA CENTRO TABASCO",
            'stor_main' => false
        ]);

    }
}
