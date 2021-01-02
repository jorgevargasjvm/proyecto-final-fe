import React, {useState, useEffect} from "react";
import {FlexRow} from "../../components/Flex";
import { Glyphicon } from 'react-bootstrap';
export default function PurcgasePage() {
    return(
            <div>


                        <h1>Kupovina!</h1>


                        <FlexRow>
                            <label>First Name</label>
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input  name="first_name" placeholder="First Name" class="form-control"  type="text" />
                        </FlexRow>

                <FlexRow>
                    <label>First Name</label>
                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    <input  name="first_name" placeholder="First Name" class="form-control"  type="text" />
                </FlexRow>


                        <div class="form-group">
                            <label class="col-md-4 control-label" >Last Name</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input name="last_name" placeholder="Last Name" class="form-control"  type="text" />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">E-Mail</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                    <input name="email" placeholder="E-Mail Address" class="form-control"  type="text" />
                                </div>
                            </div>
                        </div>



                        <div class="form-group">
                            <label class="col-md-4 control-label">Phone #</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input name="phone" placeholder="(845)555-1212" class="form-control" type="text" />
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-4 control-label">Address</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                    <input name="address" placeholder="Address" class="form-control" type="text" />
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-4 control-label">City</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                    <input name="city" placeholder="city" class="form-control"  type="text" />
                                </div>
                            </div>
                        </div>



            </div>

    )
}