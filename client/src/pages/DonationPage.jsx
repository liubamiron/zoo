import {Link} from "react-router-dom";
import {useTranslation} from "../providers/index.js";


function DonationPage() {
    const {t, language} = useTranslation();
    return (
        <div className={"bg_banner"}>
            <div className="bg_banner_green height_280">
                &nbsp;
            </div>
            <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/donation'}>{t('DONATION')}</Link>
                </span>
            </div>
        </div>
    );
}

export default DonationPage;