import {Button} from "react-bootstrap";
import {useTranslation} from "../providers";


const HomePage = () => {

    const {t} = useTranslation();

    return (
        <>
            <div className={'z2'} style={{ position: 'relative', height: '800px' }}>
                {/* Buttons Container */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}>
                    <h1 style={{fontSize: '85px', color: 'white'}}>Grădina zoologică</h1>
                    <Button variant="outline-light" className={'btn_by'}>
                        {t('BY_TICKET')}
                    </Button>
                    <Button variant="outline-light" className={'btn_by'}>
                        Донат
                    </Button>
                </div>

                {/* Image */}
                <img src={'z2.svg'} className={'img-fluid'} alt={'zoo_banner'} style={{ width: '100%', height: 'auto' }} />
            </div>



            home
        </>
    );
};

export default HomePage;