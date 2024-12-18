var code;
var series_letter;
var year;
var paper_num;
var year_code;
var paper_type;

//group of buttons
var subject_buttons = document.querySelectorAll(".subject_button");
var series_buttons = document.querySelectorAll(".series");
var year_buttons = document.querySelectorAll(".year");
var paper_type_buttons = document.querySelectorAll(".paper_type");

//URLs for each step of the process
var subject_url;
var series_url;
var year_url;
var paper_type_url;

//gg refers to gceguide, using for supporting files only
var gg_subject_url = "https://papers.gceguide.cc/cambridge-IGCSE/information-&-communication-technology-(0417)"
var gg_series_url;
var gg_year_url; // gce guide path till full year (2021/22/23). full paper code still remaining
var gg_paper_type_url;
var gg_sf_link; // contains full gce guide supporting file path except '.zip' at the end

// Subject click
function subject_click(clickedSubject) {
    var clickedSubjectId = clickedSubject.id;

    var subject_codes = {
        'Math': '0580',
        'Biology':'0610',
        'Chemistry': '0620',
        'Physics': '0625',
        'CS':'0478',
        'ICT': '0417',
        'English FLE': '0500',
        'Economics':'0455',
        'BST':'0450',
        'Hindi': '0549'
    };

    code = subject_codes[clickedSubjectId];

    subject_url = `https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/${code}`;

    subject_buttons.forEach(btn => {
        if (btn.id !== clickedSubjectId) {
            btn.remove();
        }
    });
}

// Series click
function series_click(clickedSeries) {
    var clickedSeriesId = clickedSeries.id;

    var series_letters = {
        'Feb/March': 'm',
        'May/June': 's',
        'Oct/Nov': 'w'
    };

    series_letter = series_letters[clickedSeriesId];

    series_url = `${subject_url}_${series_letter}`;

    series_buttons.forEach(btn => {
        if (btn.id !== clickedSeriesId) {
            btn.remove();
        }
    });
}

// Year click
function year_click(clickedYear) {
    var clickedYearId = clickedYear.id;

    var year_codes = {
        "2012":"12",
        "2013": "13",
        "2014": "14",
        "2015": "15",
        "2016": "16",
        "2017": "17",
        "2018": "18",
        "2019": "19",
        "2020": "20",
        "2021": "21",
        "2022": "22",
        "2023": "23"
    };

    year_code = year_codes[clickedYearId]; // the 'year' variable contains 20,21,22,23... not 2022,2021,2022,2023...
    year = `20${year_code}`

    year_url = `${series_url}${year_code}`;

    //Link for supporting files - Part 1
    gg_year_url = `${gg_subject_url}/${year}`

    year_buttons.forEach(btn => {
        if (btn.id !== clickedYearId) {
            btn.remove();
        }
    });
}

// Paper number entry value
function number_entry(textbox) {
    paper_num = textbox.value;
}

// Paper type click
function paper_type_click(clickedType){
    var clickedTypeId = clickedType.id;

    paper_type_codes = {
        'question_paper': 'qp',
        'mark_scheme': 'ms',
        'supporting_files':'sf'
    }

    paper_type = paper_type_codes[clickedTypeId];

    paper_type_url = `${year_url}_${paper_type}`;

    paper_type_buttons.forEach(btn => {
        if (btn.id !== clickedTypeId) {
            btn.remove();
        }
    });

    //Check if supporting files selected, run gceguide url
    if (paper_type === 'sf') {
        var gg_sf_link = `${gg_year_url}/0417_${series_letter}${year_code}_sf_${paper_num}`
}}

// Scroll to bottom
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// Paper Number button click
function genbutton_click() {
    // Check the specific case first
    if (paper_type === 'sf' && year === '2022' && series_letter === 'w' && paper_num === '02') {
        // Specific link for this special case
        var ms_paper_num = '2'; // paper number for ms since ms accepts '2' and not '02'
        var special_link = "https://pastpapers.papacambridge.com/viewer/caie/igcse-ict0417-2022-oct-nov-0417-w22-sf-02-zip";
        var special_ms_link = `${year_url}_ms_${ms_paper_num}.pdf#view=FitH`;

        // Display the special link and the marking scheme
        main_link_placeholder = document.getElementById('main_link_placeholder');
        main_link_placeholder.innerHTML = "<br><h2>Generated Past Paper Link: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + special_link + "' target='_blank'>" + special_link + "</a>";

        ms_link_placeholder = document.getElementById("ms_link_placeholder");
        ms_link_placeholder.innerHTML = "<h2>Marking Scheme: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + special_ms_link + "' target='_blank'>" + special_ms_link + "</a><br>";

        document.getElementById("ending_text").innerHTML = "<br><br><h1>If the link doesn't work, the specified paper may not exist!</h1><h3>Credits: PapaCambridge</h3><br><br>";

        scrollToBottom();
    } 
    // Existing functionality
    else if (paper_num.length === 2) {
        // Nested if for handling the sf (supporting files) case
        if (paper_type === 'sf') {
            // Generate the link for supporting files
            var gg_sf_link = `${gg_year_url}/0417_${series_letter}${year_code}_sf_${paper_num}.zip`;

            main_link_placeholder = document.getElementById('main_link_placeholder');
            main_link_placeholder.innerHTML = "<br><h2>Generated Past Paper Link: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + gg_sf_link + "' target='_blank'>" + gg_sf_link + "</a>";                    

            // Supporting files don't have a marking scheme link
            ms_link_placeholder = document.getElementById("ms_link_placeholder");
            ms_link_placeholder.innerHTML = "";

            document.getElementById("ending_text").innerHTML = "<br><br><h1>If the link doesn't work, the specified paper may not exist!</h1><h3>Credits: PapaCambridge</h3><br><br>";

            scrollToBottom();
        } else {
            // Generate the link for question papers and mark schemes
            var number_url = `${paper_type_url}_${paper_num}`;
            var main_url = `${number_url}.pdf#view=FitH`;
            var ms_link = `${year_url}_ms_${paper_num}.pdf#view=FitH`;

            main_link_placeholder = document.getElementById('main_link_placeholder');
            main_link_placeholder.innerHTML = "<br><h2>Generated Past Paper Link: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + main_url + "' target='_blank'>" + main_url + "</a>";                    

            ms_link_placeholder = document.getElementById("ms_link_placeholder");
            ms_link_placeholder.innerHTML = "<h2>Marking Scheme: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + ms_link + "' target='_blank'>" + ms_link + "</a><br>";

            document.getElementById("ending_text").innerHTML = "<br><br><h1>If the link doesn't work, the specified paper may not exist!</h1><h3>Credits: PapaCambridge</h3><br><br>";

            scrollToBottom();
        }
    } 

    else if (paper_num.length === 1) {
        upd_paper_num = `0${paper_num}`

        var number_url = `${paper_type_url}_${upd_paper_num}`;
        var main_url = `${number_url}.pdf#view=FitH`;
        var ms_link = `${year_url}_ms_${paper_num}.pdf#view=FitH`;

        main_link_placeholder = document.getElementById('main_link_placeholder');
        main_link_placeholder.innerHTML = "<br><h2>Generated Past Paper Link: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + main_url + "' target='_blank'>" + main_url + "</a>";                    

        ms_link_placeholder = document.getElementById("ms_link_placeholder");
        ms_link_placeholder.innerHTML = "<h2>Marking Scheme: </h2><br><a style='border:3px solid;padding:10px;font-size:20px' href='" + ms_link + "' target='_blank'>" + ms_link + "</a><br>";

        document.getElementById("ending_text").innerHTML = "<br><br><h1>If the link doesn't work, the specified paper may not exist!</h1><h3>Credits: PapaCambridge</h3><br><br>";

        scrollToBottom();
    }

    else {
        alert("Please enter a valid paper number");
    }
}



// Random button click
function random_click(className) {
    var buttons = document.querySelectorAll(`.${className}`);
    var randomIndex = Math.floor(Math.random() * buttons.length);
    buttons[randomIndex].click();
}