import { useEffect, useMemo, useState } from "react";

import { getJobTitles, addAttendant } from "../../api";
import FormItem from "./FormItem";
import Loading from "../Loading";

let submittedId = 0;

export default function Form() {
    const [submitted, setSubmitted] = useState([]);

    // string[]
    const [jobTitles, setJobTitles] = useState([]);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(null);
    const [jobTitle, setJobTitle] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setJobTitles((await getJobTitles()).data.sort());
            setLoading(false);
        })();
    }, []);

    const sortedSubmitted = useMemo(() => {
        return [...submitted].sort((a, b) => a.age - b.age);
    }, [submitted]);

    const handleSubmit = async e => {
        e.preventDefault();

        const submitted = {
            name,
            lastName,
            age,
            jobTitle,
            id: submittedId++,
        };

        setSubmitted(x => [...x, submitted]);

        setLoading(true);
        await addAttendant(submitted);
        setLoading(false);
    };

    return (
        <div
            className="flex flex-col flex-gap"
            style={{
                width: "100vw",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-md flex-gap w-md"
            >
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="p-md input-outline"
                    required
                    disabled={loading}
                />

                <input
                    onChange={e => setLastName(e.target.value)}
                    type="text"
                    placeholder="Last Name"
                    className="p-md input-outline"
                    required
                    disabled={loading}
                />

                <select
                    onChange={e => setJobTitle(e.target.value)}
                    required
                    placeholder="Job title"
                    className="p-md input-outline"
                    disabled={loading}
                >
                    {jobTitles.map(titleString => (
                        <option
                            key={titleString}
                            selected={titleString === jobTitle}
                        >
                            {titleString}
                        </option>
                    ))}
                </select>

                <input
                    onChange={e => setAge(e.target.value)}
                    type="number"
                    placeholder="Age"
                    className="p-md input-outline"
                    required
                    min={0}
                    max={99}
                    disabled={loading}
                />

                <div className="flex flex-row flex-gap">
                    <button
                        disabled={loading}
                        type="Submit"
                        style={{ flex: "1" }}
                    >
                        {loading ? "WAAIT" : "Go Ahead"}
                    </button>
                    {loading && <Loading />}
                </div>
            </form>

            <div className="flex flex-col flex-gap">
                {sortedSubmitted.map(props => (
                    <FormItem {...props} key={props.submittedId} />
                ))}
            </div>
        </div>
    );
}
