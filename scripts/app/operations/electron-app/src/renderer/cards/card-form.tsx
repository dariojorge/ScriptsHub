import { useEffect, useRef, useState } from "react";
import CheckBoxComponent from "../check-box/CheckBox";
import DropDownComponent from "../drop-down/DropDown";
import CardSuggestionsComponent from "./card-suggestions";
import { camelToWords, isBlank, wordsToCamel } from "../utils/utils";
import { loadRunnerProfiles, saveRunnerProfile } from "../db/db-runners";

const RUNNERS_PROFILE_DEFAULT: RunnersProfileModel = {
    id: Date.now(),
    title: "",
    description: "",
    scriptType: "runners",
    type: "create",
    projects: [],
    recreateFiles: false,
    env: "test",
    additionalArgs: [{ key: "", value: false }],
    activeProfile: false
};
const ERRORS: FormFieldsErrorModel = {
    titleError: "",
    projectsError: ""
}
const maxCharsDescription = 50;
const maxCharsTitle = 25;

const CardFromComponent = (props: { cards: any, setCards: any, projects: string[] }) => {
    const isInitialRender = useRef(false);
    const [formData, setFormData] = useState(RUNNERS_PROFILE_DEFAULT);
    const [reset, setReset] = useState<boolean>(false);
    const [envs, setEnvs] = useState<string[]>([]);
    const [args, setArgs] = useState<string[]>([]);
    const [argsCondition, setArgsCondition] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormFieldsErrorModel>(ERRORS);

    useEffect(() => {
        isInitialRender.current = true;
        loadRunnerProfiles()
            .then((profileData: any[]) => {
                profileData.forEach((profile: any) => props.setCards((prev: RunnersProfileModel[]) => ([...prev, profile.data])));

                props.setCards((prevItems: RunnersProfileModel[]) => [
                    ...prevItems.filter(item => item.activeProfile),
                    ...prevItems.filter(item => !item.activeProfile)
                ]);
            });
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        const ardData: AdditionalArg[] = [];
        args.forEach((arg) => ardData.push({
            key: arg,
            value: false
        }));

        setFormData({
            ...formData,
            additionalArgs: ardData,
        });

        if (!isBlank(errors.projectsError)) {
            setErrors({
                ...errors,
                projectsError: ""
            });
        }
    }, [args]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        setArgsCondition(args.length > 0 && formData.additionalArgs.length > 0);
    }, [formData.additionalArgs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (!isBlank(errors.titleError) && errors.titleError.toLowerCase().includes(name)) {
            setErrors({
                ...errors,
                titleError: ""
            });
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleArgsChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setFormData(prev => ({
            ...prev,
            additionalArgs: prev.additionalArgs.map(item =>
                item.key === event.target.name ? { ...item, value: !item.value } : item
            ),
        }));
    };

    const handleAddCard = () => {
        if (!formData.title.trim()) {
            setErrors({
                ...errors,
                titleError: "Title Is Missing!"
            });
            return;
        }

        if (formData.projects.length <= 0) {
            setErrors({
                ...errors,
                projectsError: "No projects selected!"
            });
            return;
        }

        const newCard: RunnersProfileModel = {
            id: Date.now(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            scriptType: formData.scriptType,
            type: formData.type,
            projects: formData.projects,
            recreateFiles: formData.recreateFiles,
            env: formData.env,
            additionalArgs: formData.additionalArgs,
            activeProfile: false
        };

        if (props.cards.find((card: RunnersProfileModel) => card.title === newCard.title)) {
            setErrors({
                ...errors,
                titleError: "This Title Already Exists!"
            });
            return;
        }

        saveRunnerProfile(wordsToCamel(newCard.title), newCard);
        props.setCards([...props.cards, newCard]);
        setFormData(RUNNERS_PROFILE_DEFAULT);
        setReset(true);
    };

    const envsCondition = envs.length > 0 && formData.type !== "create";

    return (
        <>
            <div className="input-card">
                <h3>Add a New Card</h3>
                <div>
                    <input name="title" placeholder="Title" value={formData.title} maxLength={maxCharsTitle} onChange={handleChange} />
                    {!isBlank(errors.titleError) && <p style={{ color: 'red' }}>{errors.titleError}</p>}
                    <p>{formData.title.length}/{maxCharsTitle} characters</p>
                </div>

                <div>
                    <textarea name="description" placeholder="Description" value={formData.description} maxLength={maxCharsDescription} onChange={handleChange} />
                    <p>{formData.description.length}/{maxCharsDescription} characters</p>
                </div>

                <div className="dropdown-checkbox-wrapper">
                    <DropDownComponent title={"ScriptType"} name={"scriptType"} value={formData.scriptType} list={["runners"]} handleChange={handleChange} />
                    <DropDownComponent title={"Type"} name={"type"} value={formData.type} list={["create", "update", "test"]} handleChange={handleChange} />

                    {envsCondition &&
                        <DropDownComponent title={"Env"} name={"env"} value={formData.env} list={envs} handleChange={handleChange} />
                    }

                    {argsCondition && formData.type !== "create" &&
                        formData.additionalArgs.map((arg, index) => (
                            <CheckBoxComponent title={camelToWords(arg.key)} name={arg.key} checked={arg.value}
                                handleChange={(event: React.ChangeEvent<HTMLInputElement>) => handleArgsChange(event, index)}
                            />
                        ))
                    }

                    {formData.type === "create" &&
                        <CheckBoxComponent title={"Recreate Files"} name={"recreateFiles"} checked={formData.recreateFiles} handleChange={handleChange} />
                    }
                </div>

                <div>
                    <CardSuggestionsComponent title="Projects" projects={props.projects} reset={reset} setReset={setReset} setEnvs={setEnvs} setArgs={setArgs} setFormData={setFormData} />
                    {!isBlank(errors.projectsError) && <p style={{ color: 'red' }}>{errors.projectsError}</p>}
                </div>

                <button onClick={handleAddCard}>&#10133; Add Card</button>
            </div>
        </>
    );
}

export default CardFromComponent;