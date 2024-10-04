import {Button} from "react-bootstrap";
import {useTranslation} from "../providers/index.js";
import {Link} from "react-router-dom";


const NotFoundPage = () => {
    const {t, language} = useTranslation();

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>
                </span>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <img src={'/404_image.jpg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
            </div>
            <br/>
            <div className="d-flex justify-content-center align-items-center">
            <Link to={'/'}>
                    <Button variant={"outline-success"}>{t('GO_TO_MAINPAGE')}</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;