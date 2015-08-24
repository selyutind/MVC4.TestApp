using Abp.Application.Navigation;
using Abp.Localization;

namespace TestApp.Web
{
    /// <summary>
    /// This class defines menus for the application.
    /// It uses ABP's menu system.
    /// When you add menu items here, they are automatically appear in angular application.
    /// See .cshtml and .js files under App/Main/views/layout/header to know how to render menu.
    /// </summary>
    public class TestAppNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        "Home",
                        new LocalizableString("HomePage", TestAppConsts.LocalizationSourceName),
                        url: "#/",
                        icon: "fa fa-home"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "About",
                        new LocalizableString("About", TestAppConsts.LocalizationSourceName),
                        url: "#/about",
                        icon: "fa fa-info"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "Calendar",
                        new LocalizableString("Calendar", TestAppConsts.LocalizationSourceName),
                        url: "#/calendar",
                        icon: "fa fa-info"
                        )
                )
                .AddItem(
                    new MenuItemDefinition(
                        "Users",
                        new LocalizableString("Users", TestAppConsts.LocalizationSourceName),
                        url: "#/users",
                        icon: "fa fa-users"
                        )
                )               
                ;
        }
    }
}
