import { useEffect, useRef, useState } from "react";
import { loadRunnerProfiles } from "../db/db-runners";
import { camelToWords, firstElement } from "../utils/utils";

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

const RunnersComponent = () => {
    const isInitialRender = useRef(false);
    const [card, setCard] = useState<RunnersProfileModel>(RUNNERS_PROFILE_DEFAULT);
    const [output, setOutput] = useState<string>();

    useEffect(() => {
        isInitialRender.current = true;

        loadRunnerProfiles()
            .then((profileData: any[]) => {
                const activeProfile: RunnersProfileModel = firstElement(profileData.filter((profile: any) => profile.data.activeProfile)).data;
                setCard(activeProfile);
            });

        window.electronAPI.onOutput((data) => {
            setOutput((prev) => prev + data);
        });
    }, []);

    const startRunner = async () => {
        const projects = `projects=${card.projects.join(',')}`;
        const scriptType = `scriptType=${card.scriptType}`;
        const type = `type=${card.type}`;
        let runner = `./scriptHub.sh ${scriptType} ${type} ${projects}`;

        if (card.type === "create") {
            runner += ` recreateFiles=${card.recreateFiles}`;
        } else {
            runner += ` env=${card.env}`;
            card.additionalArgs.forEach(args => {
                runner += ` ${args.key}=${args.value}`;
            });
        }
        
        setOutput(`Running the command: ${runner}`);
        await window.electronAPI.execSync(`${runner}`);
    }

    return (
        <>
            <div>⚙️ SETTINGS Content</div>

            <div key={card.id} className={`output-card ${card.activeProfile ? 'active-profile' : ''}`}>
                <h4 className='title'>{card.title}</h4>
                <p className='description'>
                    <strong>Description:</strong> {card.description || "N/A"}
                </p>
                <p>
                    <strong>Script Type:</strong> {card.scriptType}
                </p>
                <p>
                    <strong>Type:</strong> {card.type}
                </p>
                {card.projects.length > 0 && (
                    <p>
                        <strong>Projects:</strong> {card.projects.join(', ')}
                    </p>
                )}
                {card.type === "create" && (
                    <p>
                        <strong>Recreate Files:</strong> {card.recreateFiles ? '✅ Active' : '❌ Inactive'}
                    </p>
                )}
                {card.type !== "create" && (
                    <p>
                        <strong>Env:</strong> {card.env}
                    </p>
                )}
                {card.additionalArgs.length > 0 && card.type !== "create" &&
                    card.additionalArgs.map((arg) => (
                        <p>
                            <strong>{camelToWords(arg.key)}:</strong> {arg.value ? '✅ Active' : '❌ Inactive'}
                        </p>
                    ))
                }

                <button onClick={() => startRunner()}>Run Profile</button>

                <pre
                    style={{
                        marginTop: 20,
                        backgroundColor: '#222',
                        color: '#0f0',
                        padding: 10,
                        height: '300px',
                        overflowY: 'auto',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {output}
                </pre>
            </div>
        </>
    );
}

export default RunnersComponent;