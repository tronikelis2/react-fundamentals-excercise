export default function FormItem({ name, lastName, jobTitle, age }) {
    return (
        <div style={{ border: "dotted gray 4px" }}>
            <p>Name: {name}</p>
            <p>Last name: {lastName}</p>
            <p>Job title: {jobTitle}</p>
            <p>Age: {age}</p>
        </div>
    );
}
