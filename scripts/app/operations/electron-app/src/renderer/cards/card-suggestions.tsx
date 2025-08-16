import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { loadBasePath, loadProjectsData } from "./BuildEnvArgs";

const CardSuggestionsComponent = (props: { title: string, projects: string[], reset: boolean, setReset: any, setEnvs: any, setArgs: any, setFormData: any }) => {
    const isInitialRender = useRef(false);
    const [basePath, setBasePath] = useState<string>();
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [envsArgs, setEnvsArgs] = useState<EnvsArgsModel[]>([]);

    useEffect(() => {
        isInitialRender.current = true;
        loadBasePath(setBasePath);
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        if (props.projects === undefined) {
            return;
        }

        setFilteredSuggestions(
            props.projects
                .filter((tag) => tag.toLowerCase().includes(tagInput.toLowerCase()))
                .filter((tag) => !tags.includes(tag))
        );

        loadProjectsData(basePath!, props.projects)
            .then((value: EnvsArgsModel[]) => setEnvsArgs(value));
    }, [props.projects]);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        if (props.projects === undefined) {
            return;
        }

        const projectsFiltered = props.projects
            .filter((tag) => tag.toLowerCase().includes(tagInput.toLowerCase()))
            .filter((tag) => !tags.includes(tag));

        setFilteredSuggestions(projectsFiltered);

        const filtered = envsArgs.filter(item => tags.includes(item.type));
        const mergedFilteredEnvsArgs = mergeArrays(filtered);
        props.setEnvs(mergedFilteredEnvsArgs.envs);
        props.setArgs(mergedFilteredEnvsArgs.args);
        props.setFormData((prev: RunnersProfileModel) => ({
            ...prev,
            projects: tags,
        }));
    }, [tags]);

    const mergeArrays = (envsArgs: EnvsArgsModel[]): EnvsArgs => {
        const envsArgsFlatted: EnvsArgs[] = [];
        let filteredEnvs: string[] = [];
        let filteredArgs: string[] = [];
        envsArgs.forEach(data => envsArgsFlatted.push(data.envsArgs));
        envsArgsFlatted.forEach(data => {
            filteredArgs = Array.from(new Set([...filteredArgs, ...data.args]));
            filteredEnvs = Array.from(new Set([...filteredEnvs, ...data.envs]));
        })

        return {
            envs: filteredEnvs,
            args: filteredArgs
        };
    }

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (!props.reset) {
            return;
        }

        setTags([]);
        setTagInput('');
        props.setReset(false);
    }, [props.reset]);

    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
            setTagInput('');
        }
    };

    const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === 'Enter' || event.key === 'Tab') && tagInput.trim()) {
            event.preventDefault();
            const match = filteredSuggestions.find((project) => project.toLowerCase() === tagInput.trim().toLowerCase());
            if (match) {
                addTag(match);
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <>
            {props.title}:
            <div className="tag-input-wrapper">

                {tags.map((tag) => (
                    <span key={tag} className="tag">
                        {tag}
                        <button onClick={() => removeTag(tag)}>×</button>
                    </span>
                ))}

                <input
                    type="text"
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                />

                {filteredSuggestions.length > 0 && (
                    <div className="tag-suggestions">
                        {filteredSuggestions.map((suggestion) => (
                            <div key={suggestion} className="suggestion" onClick={() => addTag(suggestion)} >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>

    );
}

export default CardSuggestionsComponent;