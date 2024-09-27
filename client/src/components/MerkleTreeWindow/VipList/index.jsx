import React from 'react';
import { Select } from 'react95';

export default function ({ vipList, onChange }) {
    const options = [{ label: "Select a name...", value: "" }, ...vipList.map((vip) => ({ label: vip, value: vip }))];

    return (
        <Select
            width={300}
            menuMaxHeight={160}
            defaultValue={""}
            options={options}
            onChange={onChange}
        />
    );
}
