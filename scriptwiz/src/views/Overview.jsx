import style from "../assets/style";
import json from "../assets/the_addams_family_short.txt-2.json"

const Overview = () => {

    {/* Get a list of characters from metadata */}
    const getCharacters = () => {
        const rows = json.metadata.split('\n')
        const characters = rows
        .filter(row => row.trim() !== '') // Filter out empty or whitespace-only rows
        .filter(row => {
          const characters = row.split(' ')[0]; // Get the first word
          return !characters.includes('(');     // Filter out if the first word contains '('
        })
        .map(row => row.split(' ')[0]);
        return characters;
    }

    const renderCharacters = () => {
        let characters = getCharacters();
        let list = [];
        for(let i=0; i<characters.length;i++){
            list.push(
                <li key={i}>{characters[i]}</li>
            );
        }
        return list
    }


    return(
    <main className="mainStyling p-10">
        <article>
            <h1 className="pb-10">Overview</h1>
        </article>
        <article className="flex flex-row">
            {/* Table Title */}
            <section className={style.overviewTable}>
                <p className={style.overviewTableItem}>Act</p>
                <p className={style.overviewTableItem}>Scene</p>
                <ul className={`list-none characterList ${style.overviewTableItem}`}>
                    {renderCharacters()}
                </ul>
                <p className={style.overviewTableItem}>Intensity</p>
            </section>
            {/* Table Content */}
            <section className=" border-2 rounded-md grow">
                <div className="" id="scenes">
                    <ul className="list-none flex flex-wrap flex-row content-around items-stretch">
                        <li></li>
                    </ul>
                </div>
            </section>
        </article>
    </main>
    );
}

export default Overview;