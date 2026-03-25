import React from "react";
import axios from "axios";
import Card from "./Card";
import { MediumURLs } from "./MediumURLs";

function ShortenText(text, startingPoint, maxLength) {
    return text.length > maxLength  ? text.slice(startingPoint, maxLength) : text;
}

function ToText(node) {
    let doc = new DOMParser().parseFromString(node, 'text/html');
    return doc.querySelector('p').textContent;
}

const monthShortname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function showDate(pubDate) {
  const splitDate = pubDate.split(" ");
  const date = splitDate[0];
  const splitMonth = date.split("-");
  const finalDate =
    monthShortname[Number(splitMonth[1] - 1)] +
    " " +
    splitMonth[2] +
    "," +
    " " +
    splitMonth[0];
  return finalDate;
}

// Wrapper for items
class MediumEmbed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {authors : []};
    }
    
    async componentDidMount() {
        var authors = [];
        for(var i = 0; i < MediumURLs.length; ++i) {
            await axios
                .get(MediumURLs[i])
                .then(async (res) => await res.data)
                .then((data) => {
                    const avatar = data.feed.image;
                    const profileLink = data.feed.link;
                    const res = data.items; //This is an array with the content. No feed, no info about author etc..
                    const posts = res.filter((item) => item.categories.length > 0);
                    
                    const itemRows = [];
                    posts.forEach((item, i) => {
                        item["avatar"] = avatar; 
                        item["profilelink"] = profileLink;
                        const row = Math.floor(i / 3);
                        if (!itemRows[row]) itemRows[row] = [];
                        itemRows[row].push(item);
                    });
                    authors.push({itemRows : itemRows});
                });
        }
        this.setState({authors : authors});
    }
    render() {
        const output =
                    this.state.authors.map( ({ itemRows }, id) => itemRows.map((row, id) => row.map((item, key) => 
                        <div className = 'medium-col' key = {key}>
                            <Card
                                src = {item.thumbnail}
                                heading = {item.title}
                                text = {ShortenText(ToText(item.content), 0, 220) + "..."}
                                label = {showDate(item.pubDate)}
                                footer = {"Read More..."}
                                path = {item.link}
                                profile = {item.avatar}
                                profileLink = {item["profilelink"]}
                            />
                        </div>)));
        return (
            <>
                <h1>{this.props.heading}</h1>
                <div className = 'medium-container'>
                    { output }            
                </div>
            </>
        );
    }
}
export default MediumEmbed;
