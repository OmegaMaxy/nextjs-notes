
function assignPerson(person_list) {
    /**
     * dazzy
     * thais
     * moyra
     * ravi
     */
    let result = []
    let assignees = person_list.slice()

    function t(person, person_list) {
        let res = person_list[Math.floor(Math.random() * person_list.length)]
        if (res == person) {
            return t(person, person_list)
        } else {
            return res
        }
    }
    person_list.forEach((person) => {
        let assigned_person = t(person, assignees)
        assignees = assignees.filter((person) => person != assigned_person)
        result.push({ name: person, assigned_person })
    })


    return result

    /**
     * return
     * {
     *  name: name
     *  assigned: name
     * }
     */
}

const input = [
    'dazzy',
    'thais',
    'rayna',
    'moyra',
    'jimmy',
    'ryan',
    'gyan',
    'roxanne'
]
console.log(assignPerson(input))