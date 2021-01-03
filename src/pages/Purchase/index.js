import React, {useState, useEffect} from "react";
import {FlexRow} from "../../components/Flex";
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {Wrapper,Box  } from './styles';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PayPal from '../../assets/images/pp.png'

export default function PurchasePage() {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onClickBuy = () => {
        console.log('test')
    }

    const [evento, setEvento] = React.useState('');

    const handleChange = (event) => {
        setEvento(event.target.value);
    };

    return(
        <div>
            <Sidebar />
            <Navbar />
        <Wrapper>
            <h1>TEXT</h1>
            <Box>
                <FlexRow>
                    <VideocamIcon style={{width: "55px", height: "55px", marginRight: "10px", marginTop: "25px"}} color={"primary"} />
                <FormControl variant="outlined" style={{minWidth: 310, marginTop: "25px"}}>
                    <InputLabel id="demo-simple-select-outlined-label">Evento</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={evento}
                        onChange={handleChange}
                        label="Evento"
                    >
                        <MenuItem value={'pre-boda'}>PRE-BODA</MenuItem>
                        <MenuItem value={'boda'}>BODA</MenuItem>
                        <MenuItem value={'cumpleano'}>CUMPLEANO</MenuItem>
                        <MenuItem value={'video-de-evento'}>VIDEO DE EVENTO</MenuItem>
                    </Select>

                </FormControl>
                </FlexRow>
                <FlexRow style={{marginTop: "55px"}}>
                <PersonIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}} color={"primary"} />
                <TextField id="first_name" label="Nombre" type="text" variant="outlined" />

                <PersonIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}} color={"primary"} />
                <TextField id="last_name" label="Apellido" type="text" variant="outlined" />

                <MailIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}} color={"primary"} />
                <TextField id="email" label="Correo electrónico" type="text" variant="outlined" />
            </FlexRow>
                <FlexRow style={{marginTop: "55px"}}>
                <PhoneIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}} color={"primary"} />
                <TextField id="phone" label="Teléfono" type="text" variant="outlined" />


                <HomeIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}} color={"primary"} />
                <TextField id="address" label="La dirección" type="text" variant="outlined" />


                <LocationCityIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}} color={"primary"} />
                <TextField id="city" label="Ciudad" type="text" variant="outlined" />
            </FlexRow>
                <FlexRow style={{marginTop: "55px"}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </MuiPickersUtilsProvider>
                </FlexRow>
            </Box>
            <img src={PayPal} style={{height: "60px"}}/>
            <FlexRow style={{marginTop: "25px"}}>
                {/* <img style={{width: "40px", height: "40px", margintRight: "10px"}} src={PayPal} /> */}
                <Button variant="contained" color="primary" onClick={onClickBuy}>
                    Comprar
                </Button>
            </FlexRow>
        </Wrapper>
        </div>
    )
}