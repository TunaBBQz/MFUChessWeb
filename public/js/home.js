
let width_web
let current_size
elements = []
links = []
write_mode = ``


set_e = (mode, select) => {

    switch (mode) {

        case 0:
            return document.querySelector(select)

        case 1:
            return document.querySelectorAll(select)

        default:
            return null

    }

}

large_ds = set_e(0, ".Large")
medium_ds = set_e(0, ".Medium")
small_ds = set_e(0, ".Small")



get_size = () => {

    size = 'L'

    if (width_web <= 640)
        size = 'S'
    else
        if (width_web > 640 && width_web < 1024)
            size = 'M'

    return size

}

set_def = () =>{

    switch (current_size) {

        case 'L':
            large_ds.classList.remove("show")
            set_e(0,".container.large").innerHTML = ""
            links = []

            break

        case 'M':
            medium_ds.classList.remove("show")
            set_e(0,".container.medium").innerHTML = ""
            links = []
            break

        case 'S':

            set_e(0, ".container.small").innerHTML = ""
            small_ds.classList.remove("show")

            bg.classList.remove("show")
            menu_icon.classList.remove("show")
            menu_ds.classList.remove("show")
            links = []

            break

    }

}

setup = () => {


    width_web = window.innerWidth
    current_size = get_size()

    setup_page();


    window.addEventListener("resize", () => {

        width_web = window.innerWidth
        if (current_size != get_size()) {
            set_def()
            setup_page()
            current_size = get_size()
        }


    })

}

setup_page = () => {
    switch (get_size()) {

        case 'L':
            video_ls_l()
            break;

        case 'M':
            video_ls_m()
            break;

        case 'S':
            video_ls_s()
            break;

    }

}

video_ls_s = async () => {

    let clean_text
    let _length
    write_mode = ``

    topic_bool = false
    clip_bool = false
    link_bool = false

    topic_value = ""
    clip_value = { name: "", link: "" }

    clip_ls = []

    await fetch("../ls_builder.txt") // Replace with your file URL
        .then(response => response.text())
        .then(text => {

            clean_text = text.replace(/\r?\n/g, "")
            _length = clean_text.length

        })
        .catch(error => console.error("Error loading file:", error));

    i = 0
    c = 0
    console.log(_length)
    while (i != _length) {

        switch (clean_text[i]) {

            case '★':
                topic_bool = true
                break

            case '*':
                clip_bool = true
                break

            case '☆':
                link_bool = true
                clip_bool = false
                break

            case '!':
                clip_bool = true
                link_bool = false
                clip_value[`name`] = clip_value.name.slice(1)
                clip_value[`link`] = clip_value.link.slice(1)
                clip_ls.push(clip_value)
                clip_value = { name: "", link: "" }
                break

            case ';':
                if (topic_bool) {

                    topic_bool = false
                    write_mode += `
                    <div class="topic-name" id=${c}>
                        ${topic_value.slice(1)}
                    </div>
                    <div class="underline"></div>
                    `
                    topic_value = ``
                    c++

                } else if (link_bool) {
                    link_bool = false
                    clip_value[`name`] = clip_value.name.slice(1)
                    clip_value[`link`] = clip_value.link.slice(1)
                    clip_ls.push(clip_value)
                    clip_value = { name: "", link: "" }

                    j = 0
                    write_mode += `<table>`
                    // console.log(clip_ls.length)
                    while (j != clip_ls.length) {
                        write_mode += `<tr><th>`

                        write_mode += `
                            <div class="video-ls">
                                <div class="v-img">
                                    <img class="v_img" src="../public/image/LightPawn.png" alt="">
                                </div>
                                <div class="clip-box">
                                    <k class="clip-name">
                                        ${clip_ls[j].name}
                                    </k>
                                </div>
                                <div class="watch-btn">
                                    Watch
                                </div>
                            </div>
                        `

                        write_mode += `</th></tr>`
                        links.push(clip_ls[j].link)
                        j++
                    }
                    write_mode += `</table>`
                    clip_ls = []

                }
                break

        }


        if (topic_bool)
            topic_value += clean_text[i]

        if (clip_bool)
            clip_value[`name`] += clean_text[i]

        if (link_bool)
            clip_value[`link`] += clean_text[i]

        i++
    }

    set_e(0, ".container.small").innerHTML = await write_mode
    small_ds.classList.add("show")

    menu_ds = set_e(0, ".menu-ds")
    bg = set_e(0, ".bg-s")

    menu_icon = set_e(0, ".menu-icon")
    menu_icon.classList.add("show")
    menu_icon.addEventListener("click", () => {

        if (menu_ds.classList.value == "menu-ds") {
            menu_ds.classList.add("show")
            bg.classList.add("show")
        }

        else {
            menu_ds.classList.remove("show")
            bg.classList.remove("show")

        }

    })

    set_e(1, ".menu-ls-m").forEach((e,i) => {

        e.addEventListener("click", () => {

            let target = document.getElementById(`${i}`)
            let offset = 50;
            let targetPosition = target.offsetTop - offset;
            set_e(0, ".container.small").scrollTo({ top: targetPosition, behavior: "smooth" });

            bg.classList.remove("show")
            menu_ds.classList.remove("show")

        })

    });

    set_e(1,".watch-btn").forEach((e,i)=>{

        e.addEventListener("click",()=>{

            window.open(links[i])

        })

    })

}

video_ls_m = async () => {

    let clean_text
    let _length
    write_mode = ``

    topic_bool = false
    clip_bool = false
    link_bool = false

    topic_value = ""
    clip_value = { name: "", link: "" }

    clip_ls = []

    await fetch("../ls_builder.txt") // Replace with your file URL
        .then(response => response.text())
        .then(text => {

            clean_text = text.replace(/\r?\n/g, "")
            _length = clean_text.length

        })
        .catch(error => console.error("Error loading file:", error));

    i = 0
    c = 0
    console.log(_length)
    while (i != _length) {

        switch (clean_text[i]) {

            case '★':
                topic_bool = true
                break

            case '*':
                clip_bool = true
                break

            case '☆':
                link_bool = true
                clip_bool = false
                break

            case '!':
                clip_bool = true
                link_bool = false
                clip_value[`name`] = clip_value.name.slice(1)
                clip_value[`link`] = clip_value.link.slice(1)
                clip_ls.push(clip_value)
                clip_value = { name: "", link: "" }
                break

            case ';':
                if (topic_bool) {

                    topic_bool = false
                    write_mode += `
                    <div class="topic-name" id=${c}>
                        ${topic_value.slice(1)}
                    </div>
                    <div class="underline"></div>
                    `
                    topic_value = ``
                    c++

                } else if (link_bool) {
                    link_bool = false
                    clip_value[`name`] = clip_value.name.slice(1)
                    clip_value[`link`] = clip_value.link.slice(1)
                    clip_ls.push(clip_value)
                    clip_value = { name: "", link: "" }

                    line = Math.ceil(clip_ls.length/2)
                    j = 0 
                    s = 0
                    write_mode += `<table>`
                    // console.log(clip_ls.length)
                    while (j != line) {
                        write_mode += `<tr>`

                        k = 0
                        while(k != 2){
                            console.log(s)
                            try {
                                write_mode +="<th>"

                            write_mode += `
                            <div class="video-ls-m">
                                <div class="v-img-m">
                                    <img class="v_img-m" src="../public/image/LightPawn.png" alt="">
                                </div>
                                <div class="clip-box-m">
                                    <k class="clip-name-m">
                                        ${clip_ls[s].name}
                                    </k>
                                </div>
                                <div class="watch-btn-m">
                                    Watch
                                </div>
                            </div>
                            `

                            write_mode +="</th>"
                            links.push(clip_ls[s].link)
                            s++
                            } catch (error) {
                                
                            }
                            
                            k++
                        }
                        write_mode += `</tr>`
                        j++
                    }
                    write_mode += `</table>`
                    clip_ls = []

                }
                break

        }


        if (topic_bool)
            topic_value += clean_text[i]

        if (clip_bool)
            clip_value[`name`] += clean_text[i]

        if (link_bool)
            clip_value[`link`] += clean_text[i]

        i++
    }
    medium_ds.classList.add("show")
    set_e(0,".container.medium").innerHTML = write_mode
    set_e(1,".menu-ls-mm").forEach(
        (e,i)=>{

            e.addEventListener("click", () => {

                let target = document.getElementById(`${i}`)
                let offset = 50;
                let targetPosition = target.offsetTop - offset;
                set_e(0, ".container.medium").scrollTo({ top: targetPosition, behavior: "smooth" });
    
                bg.classList.remove("show")
                menu_ds.classList.remove("show")
    
            })

        }
    )

    console.log(links);
    set_e(1,".watch-btn-m").forEach(
        (e,i)=>{

            e.addEventListener("click",()=>{

                window.open(links[i])

            })

        }


    )
}

video_ls_l = async () => {

    let clean_text
    let _length
    write_mode = ``

    topic_bool = false
    clip_bool = false
    link_bool = false

    topic_value = ""
    clip_value = { name: "", link: "" }

    clip_ls = []

    await fetch("../ls_builder.txt") // Replace with your file URL
        .then(response => response.text())
        .then(text => {

            clean_text = text.replace(/\r?\n/g, "")
            _length = clean_text.length

        })
        .catch(error => console.error("Error loading file:", error));

    i = 0
    c = 0
    console.log(_length)
    while (i != _length) {

        switch (clean_text[i]) {

            case '★':
                topic_bool = true
                break

            case '*':
                clip_bool = true
                break

            case '☆':
                link_bool = true
                clip_bool = false
                break

            case '!':
                clip_bool = true
                link_bool = false
                clip_value[`name`] = clip_value.name.slice(1)
                clip_value[`link`] = clip_value.link.slice(1)
                clip_ls.push(clip_value)
                clip_value = { name: "", link: "" }
                break

            case ';':
                if (topic_bool) {

                    topic_bool = false
                    write_mode += `
                    <div class="topic-name" id=${c}>
                        ${topic_value.slice(1)}
                    </div>
                    <div class="underline"></div>
                    `
                    topic_value = ``
                    c++

                } else if (link_bool) {
                    link_bool = false
                    clip_value[`name`] = clip_value.name.slice(1)
                    clip_value[`link`] = clip_value.link.slice(1)
                    clip_ls.push(clip_value)
                    clip_value = { name: "", link: "" }

                    line = Math.ceil(clip_ls.length/3)
                    j = 0 
                    s = 0
                    write_mode += `<table>`
                    // console.log(clip_ls.length)
                    while (j != line) {
                        write_mode += `<tr>`

                        k = 0
                        while(k != 3){
                            console.log(s)
                            try {
                                write_mode +="<th>"

                            write_mode += `
                            <div class="video-ls-l">
                                <div class="v-img-l">
                                    <img class="v_img-l" src="../public/image/LightPawn.png" alt="">
                                </div>
                                <div class="clip-box-l">
                                    <k class="clip-name-l">
                                        ${clip_ls[s].name}
                                    </k>
                                </div>
                                <div class="watch-btn-l">
                                    Watch
                                </div>
                            </div>
                            `

                            write_mode +="</th>"
                            links.push(clip_ls[s].link)
                            s++
                            } catch (error) {
                                
                            }
                            
                            k++
                        }
                        write_mode += `</tr>`
                        j++
                    }
                    write_mode += `</table>`
                    clip_ls = []

                }
                break

        }


        if (topic_bool)
            topic_value += clean_text[i]

        if (clip_bool)
            clip_value[`name`] += clean_text[i]

        if (link_bool)
            clip_value[`link`] += clean_text[i]

        i++
    }


    set_e(0,".container.large").innerHTML = write_mode;
    set_e(1,".menu-ls-l").forEach(
        (e,i)=>{

            e.addEventListener("click", () => {

                let target = document.getElementById(`${i}`)
                let offset = 50;
                let targetPosition = target.offsetTop - offset;
                set_e(0, ".container.large").scrollTo({ top: targetPosition, behavior: "smooth" });
    
                bg.classList.remove("show")
                menu_ds.classList.remove("show")
    
            })

        }
    )

    set_e(1,".watch-btn-l").forEach(
        (e,i)=>{
            e.addEventListener("click",()=>{

                window.open(links[i])

            })

        }
    )

    large_ds.classList.add("show")

}

main = () => {

    setup()

}
main()