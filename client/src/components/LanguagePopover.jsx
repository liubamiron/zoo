import { useState } from "react";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import {useTranslation} from "../providers";


// ----------------------------------------------------------------------

export default function LanguagePopover() {
    // const [language, setLanguage] = useState("ro"); // Default language
    const [language, setLanguage] = useState(localStorage.getItem("language") || "ro");

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
            <Dropdown.Item onClick={() => handleLanguageChange("ru")}>
                <img
                    src="/icons/ru.svg"
                    alt="ru"
                    style={{ width: 20, marginRight: 18 }}
                />
                ru
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("ro")}>
                <img
                    src="/icons/md.svg"
                    alt="ro"
                    style={{ width: 20, marginRight: 18 }}
                />
                ro
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("en")}>
                <img
                    src="/icons/us.svg"
                    alt="en"
                    style={{ width: 20, marginRight: 18 }}
                />
                en
            </Dropdown.Item>
        </DropdownButton>
    );
}
