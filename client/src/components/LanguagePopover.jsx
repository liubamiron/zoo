import { useRef, useState } from "react";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import {useTranslation} from "../providers";


// ----------------------------------------------------------------------

export default function LanguagePopover() {
    const [language, setLanguage] = useState("EN"); // Default language
    const { setLanguage: setAppLanguage } = useTranslation();

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setAppLanguage(lang);
    };

    return (
        <DropdownButton
            as={ButtonGroup}
            id="dropdown-language-button"
            title={language}
            variant="outline"
           className={'language_button'}

        >
            <Dropdown.Item onClick={() => handleLanguageChange("RU")}>
                <img
                    src="/icons/ru.svg"
                    alt="RU"
                    style={{ width: 20, marginRight: 18 }}
                />
                RU
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("RO")}>
                <img
                    src="/icons/md.svg"
                    alt="RO"
                    style={{ width: 20, marginRight: 18 }}
                />
                RO
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("EN")}>
                <img
                    src="/icons/us.svg"
                    alt="EN"
                    style={{ width: 20, marginRight: 18 }}
                />
                EN
            </Dropdown.Item>
        </DropdownButton>
    );
}
