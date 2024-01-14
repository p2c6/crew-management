<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCrewDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crew_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('crew_id');
            $table->unsignedBigInteger('document_id');
            $table->unsignedBigInteger('doc_no');
            $table->string('file_name');
            $table->string('original_file_name');
            $table->string('code');
            $table->date('issued_date');
            $table->date('expiry_date');
            $table->unsignedBigInteger('person_in_charge_user_id');
            $table->timestamps();

            $table->foreign('crew_id')->references('id')->on('crews');
            $table->foreign('document_id')->references('id')->on('documents');
            $table->foreign('person_in_charge_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crew_documents');
    }
}
